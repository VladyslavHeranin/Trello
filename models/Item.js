const { Schema, ObjectId, model } = require("mongoose")

const Item = new Schema({
    userId: {
        type: String,
        reguired: true,
    },
    listId: {
        type: String,
        reguired: true,
    },
    name: {
        type: String,
        reguired: true,
    }
})

module.exports = model("Item", Item)