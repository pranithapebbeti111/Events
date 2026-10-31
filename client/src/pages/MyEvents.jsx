
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MyEvents() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMyEvents = async () => {
            const user = JSON.parse(localStorage.getItem("user"))

            if (!user) {
                navigate("/login")
                return
            }

            try {
                const response = await fetch(
                    `http://localhost:5000/api/my-events/${user.id}`
                )

                const data = await response.json()

                if (response.ok) {
                    setEvents(data)
                } else {
                    console.log(data.message)
                }

            } catch (error) {
                console.log("Error fetching my events:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMyEvents()
    }, [navigate])

    if (loading) {
        return <h2>Loading your events...</h2>
    }

    return (
        <div className="events-page">
            <h1>My Registered Events</h1>

            {events.length === 0 ? (
                <p>You haven't registered for any events yet.</p>
            ) : (
                <div className="events-container">
                    {events.map((event) => (
                        <div className="event-card" key={event._id}>
                            <h3>{event.name}</h3>
                            <p>Category: {event.category}</p>
                            <p>{event.description}</p>
                            <p>Venue: {event.venue}</p>
                            <p>Date: {String(event.date).slice(0, 10)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyEvents

