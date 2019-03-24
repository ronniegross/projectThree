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
                const cheeseData = new Cheese(req.body.newCheese)
                // Cheese.create(cheeseData)
                // .then((cheese) => {
                user.savedCheeses.push(cheeseData)
                user.save()
                res.json(cheeseData)
                // })
            })
    },

    update: (req, res) => {
        // console.log(req.params.cheeseId)
        User.findById(req.params.userId)
            .then(user => {
                // console.log(user)
                // const updatedCheese = user.savedCheeses.filter(cheese => cheese._id.toString() === req.params.cheeseId)
                // console.log(updatedCheese)

                const indexOfCheeseToReplace = user.savedCheeses.findIndex((cheese) => {
                    return cheese._id == req.params.cheeseId
                })
                user.savedCheeses[indexOfCheeseToReplace] = req.body.savedCheese
                user.save()
                res.json(user.savedCheeses[indexOfCheeseToReplace])
            }).catch((err) => {
                console.log(err)
            })
    },

    delete: (req, res) => {
        User.findById(req.params.userId)
            .then(user => {
                const specificCheeses = user.savedCheeses.filter(cheese => cheese._id.toString() !== req.params.cheeseId)
                user.savedCheeses = specificCheeses
                user.save().then(user => {
                    res.json(user.savedCheeses)
                })
            }).catch((err) => {
                console.log(err)
            })
    },
}

module.exports = cheeseController



    // find the user by user id
    // find the cheese id within the user
    // take the body and update that to the cheese id

    // update: async (req, res) => {
    //     const userId = req.params.userId
    //     User.findById(userId)
    //         .then((user) => {
    //             const cheeseId = req.params.cheeseId
    //             const updatedCheeseData = req.body
    //             Cheese.findByIdAndUpdate(cheeseId, updatedCheeseData)
    //                 .then((cheese) => {
    //                     user.savedCheeses.push(cheese)
    //                     user.save()
    //                     res.json(cheese)
    //                 })
    //         })
    // },

    // update: async (req, res) => {
    //     const userId = req.params.userId
    //     User.findById(userId)
    //         .then((user) => {
    //             user.savedCheeses.forEach(cheese, index => {
    //                 if (cheese._id === req.params.cheeseId) {
    //                     user.savedCheeses[index] = Cheese.create(req.body)
    //                 }
    //             })
    //                 .then((cheese) => {
    //                     user.savedCheeses.push(cheese)
    //                     user.save()
    //                     res.json(cheese)
    //                 })
    //         })
    // },

    // update: async (req, res) => {
    //     const userId = req.params.userId
    //     User.findById(userId)

    //         .then((user) => {
    //             const userCheeses = user.savedCheeses

    //             // userCheeses.find(cheese => {
    //             //     console.log("CHEESE",cheese._id)
    //             // if (cheese._id === req.params.cheeseId) {
    //             // user.savedCheeses = Cheese.create(req.body)
    //             //     console.log("CHEESE",cheese)
    //             // }

    //             // })
    //             const updatedCheese = userCheeses.filter((cheese) => {
    //                 // console.log(cheese.id)
    //                 return cheese.id === req.params.cheeseId
    //             })
    //             // console.log(updatedCheese[0])
    //             user.savedCheeses.push(updatedCheese[0])
    //             console.log(user.savedCheeses)

    //             // .then((cheese) => {
    //             //     user.savedCheeses.push(cheese)
    //             //     user.save()
    //             //     res.json(cheese)
    //             // })
    //         })



    // update: async (req, res) => {
    //     const userId = req.params.userId
    //     User.findById(userId)
    //     .then((user) => {
    //         const cheeseId = req.params.cheeseId
    //         .findById(cheeseId)
    //         .then((cheese) => {
    //             const updatedCheeseData = req.body
    //             Cheese.findByIdAndUpdate(cheeseId, updatedCheeseData)
    //             .then((cheese) => {
    //                 cheese.savedCheeses.push(cheese)
    //                 cheese.save()
    //                 res.json(cheese)
    //             })
    //         })
    //     })
    // }


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