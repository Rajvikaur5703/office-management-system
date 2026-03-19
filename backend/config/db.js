const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/mydb');
        console.log(`MongoDB Connected Successfully`);
    }catch (error){
        console.error(error.message);
    }
};

module.exports = connectDB;