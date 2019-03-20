const express = require('express')
const router = express.Router()
const Cheese = require('../models/Cheese.js')

const cheeseController = {
    index: async (req, res) => {
        try {
            const cheeses = await Cheese.find({})
            res.json(cheeses)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = cheeseController 