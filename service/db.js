//import mongoose
const mongoose = require('mongoose')

//connection string
mongoose.connect('mongodb://localhost:27017/db1',{useNewUrlParser:true})

//model creation
const User = mongoose.model('User',{
    id : Number,
    name : String,
    age : Number
    })

//export model 
module.exports = {
    User
}

