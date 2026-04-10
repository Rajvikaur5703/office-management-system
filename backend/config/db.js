const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successfully`);
    }catch (error){
        console.error(error.message);
    }
};

module.exports = connectDB;

// mongodb+srv://syedsadiya1711_db_user:GMpLPBQYs9GCqt4s@cluster0.j5h0ar1.mongodb.net/?appName=Cluster0