const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide password"]
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    }
})

module.exports = mongoose.model('User',userSchema);