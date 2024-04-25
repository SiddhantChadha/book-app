const mongoose = require('mongoose');
require('dotenv').config();


const db = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
    }catch(err){
        process.exit(1);
    }
}

module.exports = db;