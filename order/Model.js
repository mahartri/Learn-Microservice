const mongoose = require('mongoose')

mongoose.model("Order", {
    customerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    internetID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
})