const express = require('express');
const app = express();
const connectDB = require('./config/maxDB');
const cors = require('cors');
const User = require('./models/user-model')
const Food = require('./models/food-model')
const userFoodCount = require('./models/userfoodcount-model');
const Joi = require('joi');
const bcrypt = require('bcryptjs')
const saltRounds = 1;
const session = require('express-session')
const bodyParser = require('body-parser');

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
        
        console.log(req.body)

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
        console.log(error)
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