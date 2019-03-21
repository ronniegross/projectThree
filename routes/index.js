const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')
const cheeseController = require('../controllers/cheeseController')

// **** user routes ****

// get all users

router.get('/', userController.index)

// get one user by id

router.get('/:userId', userController.show)

// create new user

router.post('/', userController.create)

// update a user

router.put('/:userId', userController.update)

// delete a user

router.delete('/:userId', userController.delete)

// **** cheese routes ****

// get all cheeses 

router.get('/:userId/cheeses', cheeseController.show)

// router.get('/', userController.index)

// get one cheese by id

// create a new cheese

// update a cheese

// delete a cheese

module.exports = router