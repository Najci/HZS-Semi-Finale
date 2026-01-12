
require("dotenv").config({ path: "../secret.env" });
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const Joi = require('joi');
const bcrypt = require('bcryptjs')
const saltRounds = 1;
const session = require('express-session')
const qs = require('qs');
const mongoose = require('mongoose');
const User = require('./models/user-model')

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors())
app.use(express.json());
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});


const { trusted } = require('mongoose');
const bodyParser = require('body-parser');
const Game = require('./models/game-model');

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use(express.json());
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
app.get('/api/game/:userId', async (req, res) => {
  try {
    let game = await Game.findOne({ player: req.params.userId });
    if (!game) { 
      game = new Game({ player: req.params.userId });
      await game.save();
    }
     if (game.gameOver) {
        let user = await User.findOne({ _id: req.params.userId });
        let highScore = user.highScore;
        user.highScore = Math.max(user.highScore, game.score);
        await user.save();
        
      return res.json({game, highScore:  user.highScore });
    }

    let prompt = `
Return ONLY valid JSON. Do NOT include \`\`\`json fences, explanations, or extra text.

Minimum tokens: 400
We are building a Social and Emotional Learning life simulator minigame to help users learn about emotions, similar to BitLife.
You are 18 years old.
This is day ${game.month}. The user has ${game.happiness}% happiness, and ${game.compassion}% compassion, ${game.confidence}% confidence. 

Generate ONE event that can affect happiness, compassion, confidence. Include Social and Emotional learning or psychological terms in this format: <span className="tooltip" value = "term explanation">term</span>. Do not include this format in the term explanation. Do not use the term empathy.
The JSON MUST have:

{
  "event": "string describing the event",
  "options": [
    {
      "text": "Action description (max 20 words)",
      "happiness": number,
      "compassion": number,
      "confidence": number,
      "status": "indicate changes with arrows, e.g., ↓ Happiness (Mandatory, if no changes use e.g. ↔ Compassion, use multiple arrows to emphasise, there should usually be 1-2 stats at a time, but sometimes 3)"
      {
      "text": "Action description (max 20 words)",
      "happiness": number,
      "compassion": number,
      "confidence": number,
      "status": "indicate changes with arrows, e.g., ↓ Happiness (Mandatory, if no changes use e.g. ↔ Compassion, use multiple arrows to emphasise, there should usually be 1-2 stats at a time, but sometimes 3)"
      {
      "text": "Action description (max 20 words)",
      "happiness": number,
      "compassion": number,
      "confidence": number,
      "status": "indicate changes with arrows, e.g., ↓ Happiness (Mandatory, if no changes use e.g. ↔ Compassion, use multiple arrows to emphasise, there should usually be 1-2 stats at a time, but sometimes 3)"
      {
      "text": "Action description (max 20 words)",
      "happiness": number,
      "compassion": number,
      "confidence": number,
      "status": "indicate changes with arrows, e.g., ↓ Happiness (Mandatory, if no changes use e.g. ↔ Compassion, use multiple arrows to emphasise, there should usually be 1-2 stats at a time, but sometimes 3)"
    }
  ]  
}
  The minimum increase for the stats should be 15.
  There should be between 2 and 4 options.
  The options should be realistic and varied, with different tradeoffs. Some options should have mixed effects, some should have clear positive or negative effects.
  Make new events each day, do not repeat events.

`;

     const result = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "user", content: prompt },
    
    ]
  });

    let text = result.choices[0].message.content;
    console.log(text);
    text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("Model did not return valid JSON:", err);
      parsed = { error: "Invalid JSON from model", raw: text };
    }

    res.json({
      game,
      event: parsed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/game/:userId/choice', async (req, res) => {

    const choice = req.body.data;
    console.log(choice);
    let game = await Game.findOne({ player: req.params.userId });
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    
    let deductor = 10+ + (game.day%5 * 5);
    game.happiness = game.happiness + choice.happiness - deductor;
    game.confidence = game.confidence + choice.confidence - deductor;
    game.compassion = game.compassion + choice.compassion - deductor;
    if (game.happiness > 100) game.happiness = 100;
    if (game.confidence > 100) game.confidence = 100;
    if (game.compassion > 100) game.compassion = 100;
    if (game.happiness <= 0 || game.confidence <= 0 || game.compassion <= 0) {
        game.gameOver = true;
    }
    game.day += 1;
    game.score = game.day;
    game.previousChoices.push(choice.text);
    await game.save();
    console.log(game);
    res.json(game);
    
});


app.delete('/api/game/delete', async (req, res) => {
    console.log(req.body);
    try {
        await Game.deleteOne({ player: req.body._id });
        res.status(200).send("Game deleted.");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})


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


app.get('/signup', (req, res) => {
    res.send("dobar")
    res.status(200)
})

app.post('/api/retire', async (req, res) => {
    let game = await Game.findOne({ player: req.body.data._id });
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    game.gameOver = true;
    await game.save();
    console.log(game);
    res.json(game);
});


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


app.post('/dashboard', async (req, res) => {
        console.log(req.body.data.highScore);
        const user = await User.findOne({ _id: req.body.data._id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user.highScore);
})

app.get('/api/game/:userId', async (req, res) => {
    try {
        let game = await Game.findOne({ player: req.params.userId });
        if (!game) { 
            game = new Game({ player: req.params.userId });
            await game.save();
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

})
app.get('/api/leaderboard', async (req, res) => {
    try {
        const topUsers = await User.find().sort({ highScore: -1 }).select('username highScore -_id');
        res.json(topUsers);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))