const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    highScore: {type: Number, default: 0},
    dateOfCreation:{type: mongoose.Schema.Types.Date}
}
)
const User = mongoose.model('User', userSchema);

module.exports = User;