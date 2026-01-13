const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    calories: {type: Number, required: true },
    protein: {type: Number, required: true},
    fats: { type: Number, required: true },
    sugar: {type: Number, required: true},
    carbs: {type: Number, require: true},
})

const Food = mongoose.model('food', foodSchema);

module.exports = Food;