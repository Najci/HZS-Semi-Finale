const mongoose = require('mongoose');

const userFoodCountSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, Ref: "user"},
    food: {type: mongoose.Schema.Types.ObjectId, Ref: "food"},
    count: {type: Number, default:0}
}
)
const userFoodCount = mongoose.model('userfoodcount', userFoodCountSchema);

module.exports = userFoodCount