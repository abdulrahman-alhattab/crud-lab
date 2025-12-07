const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name:{type:String, required:true},
  description: {type:String,required:true},
  image: String,
})
const food = mongoose.model('food', foodSchema)
module.exports =food
