// const mongoose= require("mongoose");

// const userSchema= new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// })

// module.exports = mongoose.model("users",userSchema)


const mongoose = require("./config"); // Importing mongoose instance from config.js

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model("users", userSchema);
