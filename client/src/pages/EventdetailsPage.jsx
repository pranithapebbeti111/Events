import { useState } from "react"
import { useParams } from "react-router-dom"
import events from "../data/events"

function EventdetailsPage() {
  const { id } = useParams()

  const event = events.find((event) => event.id === Number(id))

  const [registered, setRegistered] = useState(false)

  if (!event) {
    return <h1>Event not found</h1>
  }

  const handleRegister = () => {
    setRegistered(true)
  }

  return (
    <div className="event-details">
      <h1>{event.title}</h1>

      <p>{event.category}</p>

      <p>📅 {event.date}</p>

      <p>📍 {event.venue}</p>

      <h2>Description</h2>

      <p>{event.description}</p>

      {registered ? (
        <p>✅ You are registered for this event!</p>
      ) : (
        <button onClick={handleRegister}>
          Register for Event
        </button>
      )}
    </div>
  )
}

export default EventdetailsPage