const express = require('express')
const router = express.Router()
const User = require('../models/User.js')

const userController = {

    index: async (req, res) => {
        try {
            const users = await User.find({})
            res.json(users)
        } catch (err) {
            console.log(err)
        }
    }, 

    show: async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findById(userId)
            res.json(user)
        } catch(err) {
            console.log(err)
            res.json(err)
        }
    },

    create: async (req, res) => {
        try {
            const newUser = new User(req.body.user)
            const savedUser = await User.create(newUser)
            res.json(savedUser)
        } catch(err) {
            console.log(err)
            res.json(err)
        }
    },

    update: async (req, res) => {
        try {
            const userId = req.body.user._id
            // console.log("I am a user id - " + userId);
            const updatedUser = new User(req.body.user)
            const savedUser = await User.findByIdAndUpdate(userId, updatedUser)
            res.json(savedUser)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    
    delete: async (req, res) => {
        try {
            // console.log(req.params)
            const userId = req.params.userId
            await User.findByIdAndDelete(userId)
            res.json({
                msg: 'User successfully deleted'
            })
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = userController 