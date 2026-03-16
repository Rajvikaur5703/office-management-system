const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/frontend")
        console.log("Connected")
    }
    catch(error){
        console.log(error)
    }
}

module.exports = connectDB