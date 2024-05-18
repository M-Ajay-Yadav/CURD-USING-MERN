

const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
require("./db/config");
const User = require('./db/User');
const Product = require('./db/Product');

const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result);

    // resp.send('api in progress');
    // resp.send(req.body);
    // resp.send(result);
})

app.post("/login", async (req, resp) => {
    // resp.send(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user},jwtkey,{expiresIn:"2h"}, (err,token) => {
                if(err){
                    resp.send({ result: "Jwt went wrong please try again" })
                }else{

                    resp.send(user,{auth: token})
                }

            })
        } else {
            resp.send({ result: "no User found" })
        }
    } else {
        resp.send({ result: "no User found" })
    }
})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products", async (req, resp) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            resp.send(products)
        } else {
            resp.send({ result: "No product found" })
        }

    } catch (error) {
        return ('error', error)
    }
});

app.delete("/product/:id", async (req, resp) => {
    // resp.send("working..")
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
    console.log(result)
});


app.get("/product/:id", async (req, resp) => {

    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
        console.log(result)
    } else {
        resp.send({ "result": "No Record found" })
    }
})

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }

    )
    resp.send(result)

});

// app.get("/search/:key", async (req, resp) => {
//     let result = await Product.find({
//         "$or": [
//             { name: { $regex: req.params.key } },
//             { price: { $regex: req.params.key } },
//             { description: { $regex: req.params.key } }
//         ]
//     });

//     resp.send(result)
// });
app.get("/search/:key", async (req, resp) => {
    let key = req.params.key;
    let result = await Product.find({
        $or: [
            { name: { $regex: new RegExp(key, "i") } }, // Case-insensitive regex for name
            { price: parseFloat(key) || 0 }, // Convert key to float or default to 0
            { description: { $regex: new RegExp(key, "i") } } // Case-insensitive regex for description
        ]
    });

    resp.send(result);
});



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        // console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to database", error);
    }
};

app.listen(5000)


// index.js

