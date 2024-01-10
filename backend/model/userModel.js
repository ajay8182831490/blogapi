const mongoose = require('mongoose');

const { getDate } = require("../util/util")

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String, required: true, unique: true
    }
    ,


    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    image: {
        type: String,
        default: ""

    },
    tokens: {
        type: String,
        default: ""
    }, // Array of authentication tokens (as strings)
    commentedPostIds: { type: Array, default: [] },
    likedPostIds: { type: Array, default: [] },
    added_on: {
        type: String,
        default: getDate()
    }


})

module.exports = mongoose.model('userInfo', userSchema);