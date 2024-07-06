const dotenv = require("dotenv");
// require("dotenv").config();
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./db/config");

const User = require("./db/User");
const Product = require("./db/Product");

const url = require("url");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "./.env") });

app.use(express.json());
app.use(cors());

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
  console.error("Error: BASE_URL is not defined in the environment variables.");
  process.exit(1);
}
console.log(BASE_URL);
const parsedUrl = url.parse(BASE_URL);
console.log(parsedUrl, "this is the parsed URl");
const basePath = parsedUrl.path;

const Jwt = require("jsonwebtoken");
const jwtkey = "e-comm";

app.post(`${basePath}register`, async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.status(500).send({ result: "Jwt went wrong please try again" });
    } else {
      resp.status(200).send({ result, auth: token });
    }
  });
});

app.post(`${basePath}login`, async (req, resp) => {
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
    resp.send({ result: "no User found" });
  }
});

app.post(`${basePath}add-product`, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get(`${basePath}products`, async (req, resp) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      console.log("from get products", products);
      resp.status(200).send(products);
    } else {
      resp.status(400).send({ result: "No product found" });
    }
  } catch (error) {
    return "error", error;
  }
});

app.delete(`${basePath}product/:id`, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
  console.log(result);
});

app.get(`${basePath}product/:id`, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
    console.log(result);
  } else {
    resp.send({ result: "No Record found" });
  }
});

app.put(`${basePath}product/:id`, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get(`${basePath}search/:key`, async (req, resp) => {
  let key = req.params.key;
  let result = await Product.find({
    $or: [
      { name: { $regex: new RegExp(key, "i") } },
      { price: parseFloat(key) || 0 },
      { description: { $regex: new RegExp(key, "i") } },
    ],
  });

  resp.send(result);
});

function verifyToken(req, resp, next) {
  console.warn(req.headers["authorization"]);

  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.send("please provide a valid token", err);
      } else {
        next();
      }
    });
    if (token.length === 2 && token[0] === "") {
      const token = token[1];
      req.token = token;
      next();
    } else {
      return resp
        .status(401)
        .send({ error: "Invalid authorization header format" });
    }
  } else {
    return resp.status(401).send({ error: "Authorization header is missing" });
  }
}

const PORT = process.env.PORT || 5000;
try {
  connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at :${PORT}`);
    });
  });
} catch (error) {
  console.log("server", error);
}
