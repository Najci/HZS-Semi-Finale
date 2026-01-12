const { date } = require('joi');
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    score: {type: Number, default: 0},
    day: {type: Number, default: 1},
    compassion: {type: Number, default: 50},
    happiness: {type: Number, default: 50},
    confidence: {type: Number, default: 50},
    gameOver: {type: Boolean, default: false},
    previousChoices: {type: Array, default: []},
    dateOfCreation:{type: mongoose.Schema.Types.Date, default: Date.now()}
}
)
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;