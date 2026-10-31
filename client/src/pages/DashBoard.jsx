
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Dashboard() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if (!user) {
            navigate("/login")
            return
        }

        const fetchMyEvents = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/my-events/${user.id}`
                )

                const data = await response.json()

                if (response.ok) {
                    setEvents(data)
                }
            } catch (error) {
                console.log("Error fetching dashboard:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMyEvents()
    }, [navigate, user?.id])

    if (!user) return null

    return (
        <div className="dashboard">
            <h1>Welcome, {user.name}!</h1>
            <p>Here's your student dashboard.</p>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h2>{events.length}</h2>
                    <p>Registered Events</p>
                </div>
            </div>

            <h2>Your Upcoming Events</h2>

            {loading ? (
                <p>Loading your events...</p>
            ) : events.length === 0 ? (
                <p>You haven't registered for any events yet.</p>
            ) : (
                <div className="events-container">
                    {events.map(event => (
                        <div className="event-card" key={event._id}>
                            <h3>{event.name}</h3>
                            <p>{event.category}</p>
                            <p>Venue: {event.venue}</p>
                            <p>Date: {String(event.date).slice(0, 10)}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="dashboard-links">
                <Link to="/events">Browse Events</Link>
                <Link to="/my-events">My Events</Link>
            </div>
        </div>
    )
}

export default Dashboard
