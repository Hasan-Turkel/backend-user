"use strict"

const { default: mongoose } = require("mongoose")

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email field must be required.'],
        validate: [
            (email) => (email.includes('@') && email.includes('.')), // ValidationCheck
            'Email type is incorrect.' // If false Message.
        ]
    },

    password: {
        type: String,
        trim: true,
        required: true,
        // set: (password) => passwordEncrypt(password)
    },

    firstName: String,

    lastName: String,

}, {collection:"users", UserSchema})

module.exports = mongoose.model("User", UserSchema)