import events from "../data/events"

function MyEvents() {
  const registeredEvents = events.filter((event) => event.id === 1)

  return (
    <div className="my-events">
      <h1>My Events</h1>

      {registeredEvents.length === 0 ? (
        <p>You haven't registered for any events yet.</p>
      ) : (
        registeredEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.category}</p>
            <p>📅 {event.date}</p>
            <p>📍 {event.venue}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default MyEvents