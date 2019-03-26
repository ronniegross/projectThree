require('dotenv').config()
const mongoose = require('mongoose')

const User = require('../models/User.js')
const Cheese = require('../models/Cheese.js')

const chevre = new Cheese({
    cheeseName: "Trader Joes Chevre",
    type: "Goat",
    hardness: "Soft",
    price: 4.99,
    region: "North America",
    purchaseLocation: "Trader Joes",
    pairedWith: "Carnivore Cab Sav",
    image: "https://everyfoodfits.com/wp-content/uploads/2011/11/Trader-Joes-Favorite-Products-2.jpg",
    buyAgain: "yes"
})

const manchego = new Cheese({
    cheeseName: "Manchego Aged 12 Months",
    type: "Sheep",
    hardness: "Hard",
    price: 9.99,
    region: "Spain",
    purchaseLocation: "Whole Foods",
    pairedWith: "14 Hands Merlot",
    image: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_a94ba795-a227-4da8-8024-c588282b2167.jpg",
    buyAgain: "yes"
})

const ronnie = new User({
    name: "Ronnie",
    email: "cheeselover@aol.com",
    password: "iheartcheese",
    savedCheeses: [chevre, manchego]
})

User.remove({})
    .then(() => ronnie.save())
    .then(() => console.log('Successful Save'))
    .then(() => mongoose.connection.close())
