const mongoose = require("./config"); 

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model("users", userSchema);
