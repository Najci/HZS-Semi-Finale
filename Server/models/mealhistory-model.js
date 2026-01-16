const { json } = require('body-parser');
const mongoose = require('mongoose');

const mealHistorySchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "user",
      required: true,
    },
  
    meals: {
      type: [
        {
          prompt: {
            type: String,
            required: true,
          },

          recipe:{
            type: JSON,
            required: true
          },
  
          imageUrl: {
            type: String,
            required: true,
          },
  
          createdAt: {
            type: Date,
            default: Date.now,
          },
        }
      ],
      default: [],
    }
});
  
const MealHistory = mongoose.model('mealhistory', mealHistorySchema);

module.exports = MealHistory;