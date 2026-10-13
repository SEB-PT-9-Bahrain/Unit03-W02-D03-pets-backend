const mongoose = require('mongoose')

// Schema
const petSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true,
        min: [0, 'Age has to be above 0']
    },
    breed:{
        type:String
    }
},{timestamps: true})

// model
const Pet = mongoose.model('Pet',petSchema)


module.exports = Pet