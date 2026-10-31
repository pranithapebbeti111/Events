const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const Event = require("./models/Event")
const Student = require("./models/Student")
const Registration = require("./models/Registration")
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Event Management API is running"
    })
})

app.get("/api/test", (req, res) => {
    res.json({
        message: "Hello from Express backend!"
    })
})

// Get all events
app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find()

        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({
            message: "Error fetching events",
            error: error.message
        })
    }
})

// Add a new event
app.post("/api/events", async (req, res) => {
    try {
        const newEvent = new Event(req.body)

        const savedEvent = await newEvent.save()

        res.status(201).json({
            message: "Event added successfully!",
            event: savedEvent
        })
    } catch (error) {
        res.status(500).json({
            message: "Error adding event",
            error: error.message
        })
    }
})

// Student Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const student = await Student.findOne({ email })

        if (!student || student.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        res.status(200).json({
            message: "Login successful!",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                 role: student.role || "student"
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        })
    }
})

// Register student for an event
app.post("/api/registrations", async (req, res) => {
    try {
        const { studentId, eventId } = req.body

        // Check if the student already registered
        const existingRegistration = await Registration.findOne({
            studentId,
            eventId
        })

        if (existingRegistration) {
            return res.status(400).json({
                message: "You have already registered for this event"
            })
        }

        const registration = new Registration({
            studentId,
            eventId
        })

        await registration.save()

        res.status(201).json({
            message: "Event registration successful!"
        })

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        })
    }
})

// Get events registered by a particular student
app.get("/api/my-events/:studentId", async (req, res) => {
    try {
        const registrations = await Registration.find({
            studentId: req.params.studentId
        }).populate("eventId")

        const registeredEvents = registrations
            .filter(registration => registration.eventId)
            .map(registration => registration.eventId)

        res.status(200).json(registeredEvents)

    } catch (error) {
        res.status(500).json({
            message: "Error fetching registered events",
            error: error.message
        })
    }
})

// Student Registration
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Check if student already exists
        const existingStudent = await Student.findOne({ email })

        if (existingStudent) {
            return res.status(400).json({
                message: "Student already registered. Please login."
            })
        }

        // Create new student
        const student = new Student({
            name,
            email,
            password
        })

        await student.save()

        res.status(201).json({
            message: "Registration successful! Please login."
        })

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        })
    }
})

// Start server
const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})