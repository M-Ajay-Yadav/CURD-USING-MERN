

const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
require("./db/config");
const User = require('./db/User');
const Product = require('./db/Product');

const Jwt = require('jsonwebtoken');
const jwtkey= 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
 
    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                        resp.status(500).send({ result: "Jwt went wrong please try again" });
                    } else {
                        resp.status(200).send({ result, auth: token });
                    }
                });
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.status(500).send({ result: "Jwt went wrong please try again" });
                } else {
                    resp.status(200).send({ user, auth: token });
                }
            });
        } else {
            resp.status(404).send({ result: "no User found" });
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
            console.log("from get products",products);
            resp.status(200).send(products)

        } else {
            resp.status(400).send({ result: "No product found" })
        }

    } catch (error) {
        return ('error', error)
    }
});

app.delete("/product/:id", async (req, resp) => {
   
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




app.get("/search/:key" , async (req, resp) => {
    let key = req.params.key;
    let result = await Product.find({
        $or: [
            { name: { $regex: new RegExp(key, "i") } }, 
            { price: parseFloat(key) || 0 }, 
            { description: { $regex: new RegExp(key, "i") } } 
        ]
      
    });

    resp.send(result);
});

function verifyToken(req, resp , next){
    console.warn(req.headers['authorization'])

    let token = req.headers['authorization'];
    if(token){
          token = token.split(' ')[1];
        Jwt.verify(token, jwtkey, (err, valid) =>{
            if(err){
                resp.send("please provide a valid token",err);
            }else{
                next();
            }

        })
        if(token.length === 2 && token[0] === ''){
            const token = token[1];
            req.token = token;
            next();
        }else{
            return resp.status(401).send({error:'Invalid authorization header format'});  
        }
    }else{
        return resp.status(401).send({error:'Authorization header is missing'});
    }
        }
  


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB successfully  on port :5000");
    } catch (error) {
        console.error("Error connecting to database", error);
    }
};


connectDB().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
});




