const mongoose = require('mongoose')

// Model for MongoDB -- Modelo para MongoDB

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 6
    },
    favorites: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)