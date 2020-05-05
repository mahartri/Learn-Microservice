// Load Express
const express = require('express'),
    app = express(),
    port = 3002;

// Load body-parser
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Load mongoose
const mongoose = require("mongoose");

// Load Model.js
require("./Model")
// Load Buyer Model
const Customer = mongoose.model("Customer");

// Connect Database
mongoose.connect("mongodb://localhost:27017/buyer", () => {
    console.log("Database is Connected!")
})

app.get('/', (req, res) => {
    res.send("This is our main endpoint")
})

// Create Func
app.post("/buyer", (req, res) => {
    const newBuyer = {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address
    }
    const Buyer = new Customer(newBuyer);

    Buyer.save().then(() => {
        res.send("New buyer created")
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

app.get("/buyer/:id", (req, res) => {
    Customer.findById(req.params.id).then((buyer) => {
        if (buyer) {
            // Buyer data
            res.json(buyer)
        } else {
            res.sendStatus(400, "Buyer doesn't exist!")
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.get("/buyers", (req, res) => {
    Customer.find().then((buyers) => {
        res.json(buyers)
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.listen(port, () => {
    console.log("Up and running - Customers service")
})