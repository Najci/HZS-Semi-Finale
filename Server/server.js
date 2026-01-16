const express = require('express');
const app = express();
const connectDB = require('./config/maxDB');
const cors = require('cors');
const User = require('./models/user-model')
const Food = require('./models/food-model')
const mealHistory = require('./models/mealhistory-model')
const userFoodCount = require('./models/userfoodcount-model');
const zlib = require('zlib')
const Joi = require('joi');
const bcrypt = require('bcryptjs')
const saltRounds = 1;
const session = require('express-session')
const bodyParser = require('body-parser');
const fs = require("fs/promises")

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./upheld-magpie-484514-k4-d1feab917cd4.json";

const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "fullplatedb";
const bucket = storage.bucket(bucketName);


require("dotenv").config({ path: "../secret.env" });
const OpenAI = require("openai");
const openai = new OpenAI({
        timeout: 60000,
        apiKey: process.env.OPENAI_API_KEY
    });

connectDB()

async function uploadImageToGCS(imageBuffer, filename) {
    const file = bucket.file(filename);
  
    await file.save(imageBuffer, {
      resumable: false,
      contentType: 'image/png',           
    });
  
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
    return publicUrl;
}
  

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))


app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(session({
    secret: "my-super-secret-key",
    saveUninitialized: false,
    resave: false,  
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

function createSession(data){
    return {username: data.username, email: data.email}
}


app.get(`/api/getgoals/:userId`, async (req, res) => {
    res.status(200);
})

app.post(`/api/updategoals`, async (req, res) => {
    const data = req.body.goals;
    const userId = req.body.user._id;
    await User.updateOne(
    { _id: userId },
    { $set: { goals: data } }
    );
    
    res.status(200).send("Goals updated successfully");
})

app.get("/api/gethistory/:userId/meal/:mealId", async (req, res) => {
    const data = req.params

    try{
        const foundMealHistory = await mealHistory.findOne({ user: data.userId });

        if (!foundMealHistory) {
            return res.status(404).send("Meal history wasn't found for current user");
        }

        const foundMeal = foundMealHistory.meals.find(
            meal => meal._id.toString() === data.mealId
        );

        if(!foundMeal){
            return res.status(404).send("Meal wasn't found for current user");
        }

        foundMeal.recipe.Macro = Object.values(foundMeal.recipe.Macro);

        res.status(200).json(foundMeal.toObject());
    }
    catch(error){
        console.log(error)
        res.status(500).send({error: error})
    }
})

app.get("/api/gethistory/:userId", async (req, res) => {
    const data = req.params

    try{
        const foundMealHistory = await mealHistory.findOne({ user: data.userId });

        if (!foundMealHistory) {
            return res.status(404).send("Meal history wasn't found for current user");
        }  

        try {
            res.json(foundMealHistory);
        } 
        catch (err) {
            res.status(500).json({ message: "Failed to load meals", err: err });
        }     
    }
    catch(error){
        console.log(error)
        res.status(500).send({error: error})
    }
})

app.post("/api/getmeal", async (req, res) => {
    try {
        const data = req.body

        const prompt = data.data.prompt.map(
            food => `${food.Name} (${food.Amount}${food.Measurement})`
        );

        const promptString = prompt.join(", ");
        console.log("Prompt string:", promptString);

        const result = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
              { role: "user", content: `
                    reply only with the json,
                    create me a dish using the ingredients: ${promptString},
                    along with a step by step recipe on how to make the dish.
                    put all of this in a json format with the column names "name" and "steps".`           
                },
            ]
        }); 

       const cleanString = result.choices[0].message.content
        .replace(/```json\s*/, "")
        .replace(/```$/, "")
        .trim();

        let meal
        try {
            meal = JSON.parse(cleanString);
        } 
        catch(err) {
            console.error("Failed to parse GPT JSON:", err);
            return res.status(200).json({ success: false, error: "Invalid GPT output" });
        } 

        const image = await openai.images.generate({
        model: "gpt-image-1",
        size: "1024x1024",
        background: "transparent",
        prompt: `
            Flat vector illustration in Flaticon icon style.
            A delicious, finished, ready-to-eat meal served on a plate.
            All ingredients are combined into a single cohesive dish,
            not shown as separate items or raw components.
            Simple shapes, smooth surfaces, pastel colors,
            soft shading, clean outlines.
            No realism, no textures, no stains, no spots, no mold.
            Top-down or slight isometric view.
            Isolated plate, transparent background.
            
            Meal name: ${meal.name},
            Meal description: ${promptString}
        `
        });

        const imageBase64 = image.data[0].b64_json;
        
        const mealWithMacro = {...meal, Macro: data.data.Macros}

        const imageBuffer = Buffer.from(imageBase64, "base64");
        const filename = `foodImages/${data.user._id}_${Date.now()}.png`;

        let imageUrl
        try {
            imageUrl = await uploadImageToGCS(imageBuffer, filename);
            console.log("Image uploaded successfully:", imageUrl);
        } 
        catch (err) {
            console.error("Error uploading image:", err);
        }

        const updatedDoc = await mealHistory.findOneAndUpdate(
            { user: data.user._id },
            {
              $setOnInsert: { user: data.user._id },
              $push: {
                meals: {
                  $each: [{
                    prompt: promptString,
                    recipe: mealWithMacro,
                    imageUrl: imageUrl,
                    createdAt: new Date()
                  }],
                  $slice: -10
                }
              }
            },
            { upsert: true, new: true }
        );    

        const newMeal = updatedDoc.meals[updatedDoc.meals.length - 1];
        const newMealId = newMeal._id;

        /* await fs.writeFile(
            "plate6.png",
            imageBuffer
        ); */

        console.log("server success")

        res.status(200).json({id : newMealId});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

app.delete('/api/removeinventoryitem', async (req, res) => {
    const data = req.body

    try{

        const currentItem = await userFoodCount.findOne({ food: data.removalData._id, user: data.user._id })
        if(!currentItem){
            res.status(404).json({ error: "Could not find item to remove" })
        }

        const removalValue = currentItem.count - data.removalData.numberToRemove

        if (removalValue <= 0){
            await userFoodCount.deleteOne({ food: data.removalData._id, user: data.user._id });
            res.status(200).send("Item removed from storage due to count < 0");
        }
        else{
            await userFoodCount.findOneAndUpdate(
                { user: data.user._id, food: data.removalData._id },
                {
                    count: removalValue,         
                    user: data.user._id,
                    food: data.removalData._id
                },
                { upsert: false, new: true }
            );

            res.status(200).send("Item count reduced by removal count")
        }
       
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/api/getinventory/:userId', async (req, res) => {
    try{
        const data = req.params

        const inventoryData = await userFoodCount.find({user : data.userId})
        if (!inventoryData) {
            return res.status(404).json({ error: "Inventory data for user not found" });
        }

        const foodData = []

        for (const item of inventoryData) {
            const currFood = await Food.findById(item.food);

            if (!currFood) {continue}

            foodData.push({
                ...currFood.toObject(),
                count: item.count
            });
        }

        res.status(200).json(foodData)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.get('/api/getstore', async (req, res) => {
    try{
        const foodData = await Food.find()
        res.status(200).json(foodData)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/api/updateinventory', async (req, res) => {
    try{
        const data = req.body

        const user = await User.findOne({ _id: data.user._id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const food = await Food.findOne({ _id: data.food._id})
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }

        await userFoodCount.findOneAndUpdate(
            { user: user._id, food: food._id },
            {
                $inc: { count: data.count },
                $setOnInsert: {
                    user: user._id,
                    food: food._id
                }
            },
            { upsert: true, new: true }
        );
        
        res.status(200).send()
    }
    catch(error){
        res.status(500)
    }
})

app.post('/login', async (req, res) => {

    try {
        let data = req.body;
        const users = await User.find({ username: data.username })
        
        if (!users.length){
            res.status(400)
            return res.send("Username not found");
        }
        const correctPassword = users[0].password;
        

        bcrypt.compare(data.password, correctPassword, (err, isMatch) =>{
            if (err){
                res.status(500)
                return res.send(err);
            }

            if (!isMatch){
                
                res.status(400)
                return res.send("Incorrect password")
            }
            else{
                
                // Session starts
                req.session.user = createSession(users[0]);
                req.session.save((err) => {
                    if (err) {
                        res.status(500).send("Error saving session");
                    } else {
                        res.status(201);
                        res.json(users[0]); 
                    }
                });
            }
        })
        
    } catch (error) {
        res.status(500);
        res.json({ message: error.message });
    }
});

app.post('/signup', async (req, res) => {
    try {
        let data = req.body;
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2}),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            repeatPassword: Joi.ref('password'),
        })
        

        const { error, value } = schema.validate({ username: data.username, email: data.email, password: data.password, repeatPassword: data.repeatPassword});

        if (error){
            res.status(400)
            return res.send(error.message)
        }
        let users = await User.find({ username: data.username })
        if (users.length){
            res.status(400)
            return res.send("Username taken");
        }
        users = await User.find({ email: data.email })
        if (users.length){
            res.status(400)
            return res.send("Email taken");
        }
        const hash = await bcrypt.hash(data.password, saltRounds);
        data.password = hash;
        const { repeatPassword, ...dataToSave } = data;
        
        const today = new Date();
        signUpData = {
            ...dataToSave,
            dateOfCreation:today
        }
        let user = new User(signUpData);
        user = await user.save();
        req.session.user = createSession(user);
        res.status(201);
        
        res.json(user);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.listen(3000, () => console.log(`Listening on port ${3000}`))