// // productSchema.js
// const mongoose = require("mongoose");
// const multer = require("multer");

// const productSchema= new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String, // 'String' should have an uppercase 'S'
//         required: false
//     },
// //     imageUrl:{ 
// //     //    imageId: _id,
// //         type: Buffer,
// //         data: Buffer,
// //   contentType: String,

// //          required: false }
// });


// productSchema.statics.uploadImage = multer({ storage: multer.memoryStorage() }).single('image');
// module.exports = mongoose.model("products",productSchema)

const mongoose = require("./config"); // Importing mongoose instance from config.js
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
