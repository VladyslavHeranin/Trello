const { Schema, ObjectId, model } = require("mongoose")

const User = new Schema({
    password: {
        type: String,
        reguired: true,
    },
    email: {
        type: String,
        reguired: true,
        unique: true
    },
    name: {
        type: String,
        reguired: true,
    }
})

module.exports = model("User", User)