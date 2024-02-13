const mongoose = require('mongoose')


const userSchema= mongoose.Schema({
    userName:{
        type: String,
        required:[true, 'please provide name']
    },
    email:{
        type:String,
        required:[true, 'please provide an email'],
        unique: [true, 'this email already exists ']
    },
    password:{
        type:String,
        required:[true, 'please provide a password'],
    }
})
module.exports=mongoose.model('User', userSchema)