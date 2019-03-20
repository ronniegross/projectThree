const express = require('express')
const router = express.Router()
const Cheese = require('../models/Cheese.js')

const cheeseController = {

    show: async (req, res) => {
        try {
            const userId = req.params.id
            const currentUser = await User.findById(userId)
            const cheeses = currentUser.savedCheeses
            res.json(cheeses)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = cheeseController 