import {useNavigate} from 'react-router-dom'
function EventCard({event}){
    const navigate = useNavigate()
    return(
        <>
        <div className="event-card">
            <div className="event-category">
        <p>{event.category}</p>
        </div>
        <h2>{event.title}</h2>
        <p>{event.date}</p>
        <p>{event.venue}</p>
        <button onClick={() => navigate(`/events/${event.id}`)}>View Details</button>
        </div>
        </>
    )
}
export default EventCard