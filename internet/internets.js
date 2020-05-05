// Load Express
const express = require('express'),
    app = express(),
    port = 3001;

// Load body-parser
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Load mongoose
const mongoose = require("mongoose");

// Load Model.js
require("./Model")
// Load Internet Model
const Internet = mongoose.model("Internet");

// Connect Database
mongoose.connect("mongodb://localhost:27017/internet", () => {
    console.log("Database is Connected!")
})

app.get('/', (req, res) => {
    res.send("This is our main endpoint")
})

// Create Func
app.post("/internet", (req, res) => {
    const newInternet = {
        title: req.body.title,
        kuota: req.body.kuota,
        price: req.body.price,
        provider: req.body.provider
    }
    const internet = new Internet(newInternet);

    internet.save().then(() => {
        res.send("New internet created")
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

app.get("/internet", (req, res) => {
    Internet.find().then((internets) => {
        res.json(internets)
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.get("/internet/:id", (req, res) => {
    Internet.findById(req.params.id).then((internet) => {
        if (internet) {
            // Internet data
            res.json(internet)
        } else {
            res.sendStatus(400, "Internet doesn't exist!")
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.listen(port, () => {
    console.log("Up and running! -- This is our Internet service");
})