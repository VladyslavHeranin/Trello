const { Schema, ObjectId, model } = require("mongoose")

const List = new Schema({
    id: {
        type: String,
        reguired: true,
    }, name: {
        type: String,
        reguired: true,
    },
    items: {
        type: Array,
    }
})

module.exports = model("List", List)