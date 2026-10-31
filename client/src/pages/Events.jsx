
import { useState, useEffect } from "react"
import EventCard from "../components/EventCard"
import SearchBar from "../components/searchBar"
import FilterBar from "../components/filterBar"

function Events() {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/events")
                const data = await response.json()
                setEvents(data)
            } catch (error) {
                console.log("Error fetching events:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.name
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesCategory =
            category === "All" || event.category === category

        return matchesSearch && matchesCategory
    })

    if (loading) {
        return <h2>Loading events...</h2>
    }

    return (
        <div className="events-page">
            <h1>College Events</h1>

            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <FilterBar
                category={category}
                setCategory={setCategory}
            />

            <div className="events-container">
                {filteredEvents.map((event) => (
                    <EventCard
                        key={event._id}
                        event={{
                            ...event,
                            id: event._id,
                            title: event.name
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default Events

