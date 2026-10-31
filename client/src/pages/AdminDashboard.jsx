import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [event, setEvent] = useState({
        name: "",
        category: "",
        description: "",
        venue: "",
        date: "",
        availableSeats: ""
    })

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)

        try {
            const response = await fetch("http://localhost:5000/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...event,
                    availableSeats: Number(event.availableSeats)
                })
            })

            const data = await response.json()

            if (response.ok) {
                setMessage("Event added successfully!")

                setEvent({
                    name: "",
                    category: "",
                    description: "",
                    venue: "",
                    date: "",
                    availableSeats: ""
                })
            } else {
                setMessage(data.message || "Failed to add event")
            }
        } catch (error) {
            setMessage("Unable to connect to server")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-page">

            <div className="admin-header">
                <div>
                    <h2>College Events Admin</h2>
                    <p>Manage your college events</p>
                </div>

                <div className="admin-profile">
                    <span>Welcome, {user?.name || "Admin"}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className="admin-content">

                <div className="admin-welcome">
                    <span className="admin-tag">ADMIN PANEL</span>
                    <h1>Event Management</h1>
                    <p>Create and publish new events for students.</p>
                </div>

                <div className="admin-form-card">

                    <div className="admin-form-heading">
                        <div className="admin-form-icon">＋</div>
                        <div>
                            <h2>Add New Event</h2>
                            <p>Enter the details of your upcoming event.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="admin-form">

                        <div className="admin-form-grid">

                            <div className="admin-field">
                                <label>Event Name *</label>
                                <input
                                    name="name"
                                    placeholder="e.g. Tech Fest 2026"
                                    value={event.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="admin-field">
                                <label>Category *</label>
                                <select
                                    name="category"
                                    value={event.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Sports">Sports</option>
                                </select>
                            </div>

                            <div className="admin-field full-width">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Describe your event..."
                                    value={event.description}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            </div>

                            <div className="admin-field">
                                <label>Venue *</label>
                                <input
                                    name="venue"
                                    placeholder="Enter event venue"
                                    value={event.venue}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="admin-field">
                                <label>Event Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={event.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="admin-field">
                                <label>Available Seats *</label>
                                <input
                                    type="number"
                                    name="availableSeats"
                                    placeholder="Enter number of seats"
                                    min="1"
                                    value={event.availableSeats}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        {message && (
                            <p className="admin-message">{message}</p>
                        )}

                        <div className="admin-form-actions">
                            <button
                                type="button"
                                className="admin-clear-button"
                                onClick={() => {
                                    setEvent({
                                        name: "",
                                        category: "",
                                        description: "",
                                        venue: "",
                                        date: "",
                                        availableSeats: ""
                                    })
                                    setMessage("")
                                }}
                            >
                                Clear Form
                            </button>

                            <button
                                type="submit"
                                className="admin-submit-button"
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "+ Add Event"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard