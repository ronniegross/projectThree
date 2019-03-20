require('dotenv').config()
const mongoose = require('mongoose')

const User = require('../models/User.js')
const Cheese = require('../models/Cheese.js')

const chevre = new Cheese({
    name: "Trader Joes Chevre",
    type: "Goat",
    hardness: "Soft",
    price: 4.99,
    region: "North America",
    purchaseLocation: "Trader Joes",
    wineParing: "Carnivore Cab Sav",
    image: "https://everyfoodfits.com/wp-content/uploads/2011/11/Trader-Joes-Favorite-Products-2.jpg",
    buyAgain: true
})

const manchego = new Cheese({
    name: "Manchego Aged 12 Months",
    type: "Sheep",
    hardness: "Hard",
    price: 9.99,
    region: "Spain",
    purchaseLocation: "Whole Foods",
    wineParing: "14 Hands Merlot",
    image: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_a94ba795-a227-4da8-8024-c588282b2167.jpg",
    buyAgain: true
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

// const saved = async () => {
//     await User.deleteMany()
//     const ronnie = new User (ronnie)
//     await ronnie.save()
//     await Cheese.deleteMany()
//     const chevre = new Cheese (chevre)
//     await chevre.save()
//     const manchego = new Cheese (manchego)
//     await manchego.save()
// }

// saved()