const mongoose = require("mongoose");
const config = require('./config');

const multer = require("multer");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

productSchema.statics.uploadImage = multer({ storage: multer.memoryStorage() }).single('image');
module.exports = mongoose.model("products", productSchema);
