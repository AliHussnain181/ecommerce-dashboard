const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const Product = require("./db/Product")
const Jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const jwtKey = 'e-commopok';
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/",(req,res) => {
    res.json("Running")
})

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtKey, { expiresIn: "8h" }, (err, token) => {
        if (err) {
            res.send({ result: 'something went wrong' })
        }
        res.send({ result, auth: token })


    })
})


app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, (err, token) => {
                if (err) {
                    res.send({ result: 'something went wrong' })
                }
                res.send({ user, auth: token })
            })
        }
        else {
            res.send({ result: 'No User Found' })
        }
    }
    else {
        res.send({ result: 'No User Found' })
    }

})

app.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products", verifyToken, async (req, res) => {
    let products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ result: "No result found" })
    }
})

app.get("/dashboard",async (req,res) => {
    let products = await Product.find({})

    res.json({
       things : products.length
    })
})



app.delete("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

app.get('/product/:name', verifyToken, async (req, res) => {
    let result = await Product.findOne({ name: req.params.name });
    if (result) {
        res.send(result)
    }
    else {
        res.send({ "result": "No Record find" })
    }
})
app.put("/product/:name", verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { name: req.params.name },
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
        ]
    })
    res.send(result)
    

});

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "please provide valid token" })
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403).send({ result: "please add token with header" })
    }

}

const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
  
    console.log(`Database is connect with ${connection.host}`);
  };
  connectDB();


app.listen(process.env.PORT, () =>
  console.log(
    `Server is working on PORT: ${process.env.PORT}`
  )
);
