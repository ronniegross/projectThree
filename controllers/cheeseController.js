const express = require('express')
const router = express.Router()
const Cheese = require('../models/Cheese.js')
const User = require('../models/User.js')

const cheeseController = {

    index: async (req, res) => {
        try {
            const userId = req.params.userId
            const currentUser = await User.findById(userId)
            const cheeses = currentUser.savedCheeses
            res.json(cheeses)
        } catch (err) {
            console.log(err)
        }
    },

    show: async (req, res) => {
        try {
            const userId = req.params.userId
            const currentUser = await User.findById(userId)
            const cheeses = currentUser.savedCheeses
            const cheeseId = req.params.cheeseId
            const foundCheese = cheeses.find(cheese => {
                if (cheese._id == cheeseId)
                    return cheese
            })
            res.json(foundCheese)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },

    create: async (req, res) => {
        const userId = req.params.userId
        User.findById(userId)
        .then((user) => {
            const cheeseData = req.body
            Cheese.create(cheeseData)
            .then((cheese) => {
                user.savedCheeses.push(cheese)
                user.save()
                res.json(cheese)
            })
        })
    },

    // create: async (req, res) => {
    //     try {
    //         const userId = req.params.userId
    //         const currentUser = await User.findById(userId)
    //         const cheeseData = req.body
    //         const cheeses = currentUser.savedCheeses
    //         const newCheese = Cheese.create(cheeseData)
    //         .then((cheese) => {
    //             const savedCheese = cheeses.push(newCheese)
    //             savedCheese.save()
    //             res.json(savedCheese)
    //         })
    //     } catch(err) {
    //         console.log(err)
    //         res.json(err)
    //     }
    // },

    // update: async (req, res) => {
    //     try {
    //         const userId = req.params.id
    //         const updatedUser = req.body
    //         const savedUser = await User.findByIdAndUpdate(userId, updatedUser)
    //         res.json(savedUser)
    //     } catch(err) {
    //         console.log(err)
    //         res.status(500).json(err)
    //     }
    // },


    // create: async (req, res) => {
    //     const userId = req.params.userId
    //     User.findById(userId)
    //     .then((user) => {
    //         const cheeseData = req.body
    //         Cheese.create(cheeseData)
    //         .then((cheese) => {
    //             user.savedCheeses.push(cheese)
    //             user.save()
    //             res.json(cheese)
    //         })
    //     })
    // },

    // update: async (req, res) => {
    //     // const userId = req.params.userId
    //     // User.findById(userId)
    //     const cheeseId = req.params.cheeseId
    //     Cheese.findById(cheeseId)
    //     .then((cheese) => {
    //         const updatedCheeseData = req.body
    //         Cheese.findByIdAndUpdate(cheeseId, updatedCheeseData)
    //         .then((cheese) => {
    //             cheese.savedCheeses.push(cheese)
    //             cheese.save()
    //             res.json(cheese)
    //         })
    //     })
    // }
}

module.exports = cheeseController 