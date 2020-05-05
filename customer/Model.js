const mongoose = require("mongoose")

mongoose.model('Customer', {
    name: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    sex: {
        // 1 for Female, 0 for Male
        type: Boolean,
        require: true
    },
    address: {
        type: String,
        require: true
    },
})