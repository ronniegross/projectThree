const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Cheese = new Schema ({
    name: String,
    type: String,
    hardness: String,
    price: Number,
    purchaseLocation: String,
    wineParing: String,
    image: String,
    buyAgain: Boolean
})