const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    venue: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    availableSeats: {
        type: Number,
        required: true
    }
}, { collection: "Events" })

const Event = mongoose.model("Event", eventSchema)

module.exports = Event