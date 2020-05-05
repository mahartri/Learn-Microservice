// Load Express
const express = require('express'),
    app = express(),
    port = 3003;

// Load body-parser
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const axios = require("axios");

// Load mongoose
const mongoose = require("mongoose");

// Load Model.js
require("./Model")
// Load Order Model
const Order = mongoose.model("Order");

// Connect Database
mongoose.connect("mongodb://localhost:27017/orders", () => {
    console.log("Database is Connected!")
})

app.post("/order", (req, res) => {
    const newOrder = {
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        internetID: mongoose.Types.ObjectId(req.body.internetID)
    }
    const order = new Order(newOrder);

    order.save().then(() => {
        res.send("New order created")
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

app.get("/order", (req, res) => {
    Order.find().then((internets) => {
        res.json(internets)
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then(async (order) => {
        if (order) {
            await axios.get("http://localhost:3001/internet/" + order.internetID).then((response) => {
                const internet = {
                    price: response.data.price,
                    kuota: response.data.kuota,
                    provider: response.data.provider
                };
                axios.get("http://localhost:3002/buyer/" + order.customerID).then((response) => {
                    res.json({
                        ...internet,
                        name: response.data.name
                    })
                })
            })
        } else {
            res.sendStatus(400, "Order doesn't exist!")
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.listen(port, () => {
    console.log("Up and running - Order service")
})