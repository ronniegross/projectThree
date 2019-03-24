const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const CheeseSchema = new Schema ({
    cheeseName: String,
    type: String,
    hardness: String,
    price: Number,
    region: String,
    purchaseLocation: String,
    winePairing: String,
    image: String,
    buyAgain: Boolean
})

const UserSchema = new Schema ({
    name: String,
    email: String,
    password: String,
    savedCheeses: [CheeseSchema]
})

module.exports = {
    CheeseSchema: CheeseSchema,
    UserSchema: UserSchema
}