const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')
const cheeseController = require('../controllers/cheeseController')

// **** user routes ****

// get all users

router.get('/', userController.index)

// get one user by id

router.get('/:id', userController.show)

// create new user

router.post('/', userController.create)

// update a user

router.put('/:userId', userController.update)

// delete a user

router.delete('/:userId', userController.delete)

// **** cheese routes ****

// get all cheeses 

router.get('/:userId/cheeses', cheeseController.index)

// get one cheese by id

router.get('/:userId/cheeses/:cheeseId', cheeseController.show)

// create a new cheese

router.post('/:userId/cheeses', cheeseController.create)

// update a cheese

router.put('/:userId/cheeses/:cheeseId', cheeseController.update)

// delete a cheese

router.delete('/:userId/cheeses/:cheeseId', cheeseController.delete)

module.exports = router