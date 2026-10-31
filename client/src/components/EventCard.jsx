
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function EventCard({ event }) {
    const navigate = useNavigate()

    const [isRegistered, setIsRegistered] = useState(false)
    const [loading, setLoading] = useState(false)

    const user = JSON.parse(localStorage.getItem("user"))
    const eventId = event._id || event.id

    // Check whether the student has already registered
    useEffect(() => {
        if (!user) {
            setIsRegistered(false)
            return
        }

        const checkRegistration = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/my-events/${user.id}`
                )

                const data = await response.json()

                if (response.ok) {
                    const registered = data.some(
                        registeredEvent => registeredEvent._id === eventId
                    )

                    setIsRegistered(registered)
                }
            } catch (error) {
                console.log("Error checking registration:", error)
            }
        }

        checkRegistration()
    }, [eventId, user?.id])

    const handleRegister = async () => {
        if (!user) {
            alert("Please login first!")
            navigate("/login")
            return
        }

        setLoading(true)

        try {
            const response = await fetch(
                "http://localhost:5000/api/registrations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        studentId: user.id,
                        eventId: eventId
                    })
                }
            )

            const data = await response.json()

            if (response.ok) {
                setIsRegistered(true)
                alert("Successfully registered for " + event.title)
            } else {
                if (response.status === 400) {
                    setIsRegistered(true)
                }
                alert(data.message)
            }

        } catch (error) {
            alert("Unable to register. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="event-card">
            <h3>{event.title}</h3>
            <p>{event.category}</p>
            <p>{event.description}</p>
            <p>Venue: {event.venue}</p>
            <p>Date: {String(event.date).slice(0, 10)}</p>

            <button
                onClick={handleRegister}
                disabled={isRegistered || loading}
            >
                {loading
                    ? "Registering..."
                    : isRegistered
                    ? "Registered ✓"
                    : "Register"}
            </button>
        </div>
    )
}

export default EventCard
