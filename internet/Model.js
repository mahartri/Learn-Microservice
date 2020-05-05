const mongoose = require("mongoose");

// book model
mongoose.model("Internet", {
    title: {
        type: String,
        require: true
    },
    kuota: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    provider: {
        type: String,
        require: false
    }

})