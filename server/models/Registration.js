const mongoose = require("mongoose")

const registrationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "Registrations" })

const Registration = mongoose.model("Registration", registrationSchema)

module.exports = Registration