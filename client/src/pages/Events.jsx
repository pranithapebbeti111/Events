import { useState } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/searchBar";
function Events(){
    const[search,setSearch]=useState("")
    const events=[
        {
            id:1,
            title:"Hackathon 2026",
            category:"Technical",
            date:"20 september 2026",
            venue:"Main Seminar hall"
        },
         {
      id: 2,
      title: "Code Sprint",
      category: "Technical",
      date: "25 September 2026",
      venue: "Computer Lab"
    },
    {
      id: 3,
      title: "Cultural Fest",
      category: "Cultural",
      date: "30 September 2026",
      venue: "College Ground"
    }
    ]

const filteredEvents = events.filter((event) =>
  event.title.toLowerCase().includes(search.toLowerCase())
)


    return(
        <>
        <div className="events-page">
        <h1>College events</h1>
        <SearchBar
        search={search}
        setSearch={setSearch}
        />
        <div className="events-container">
        {
            filteredEvents.map((event)=>(
                <
                EventCard 
                key={event.id} 
                event={event}
                />
            ))
        }
        </div>
        </div>
        </>
    )
}

export default Events
