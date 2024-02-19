const mongoose = require('mongoose')


const productlist= mongoose.Schema({
    name:{
        type: String,
        required:[true, 'please provide name']
    },
    price:{
        type:Number
    },
    series_number:{
        type:Number,
        // unique:true
    },
    imageUrl:{
        type:String
    }
})
module.exports=mongoose.model('product', productlist)