"use strict"


const router = require('express').Router()

const User = require('../controllers/user.controller')



// // Login/logout:
// router.post('/login', User.login)
// router.all('/logout', User.logout)


router.route('/')
    .get(User.list)
    .post(User.create)

router.route('/:id')
    .get(User.read)
    .put(User.update)
    .delete(User.delete)

module.exports = router