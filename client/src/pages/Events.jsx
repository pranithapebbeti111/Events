import { useState } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/searchBar";
import FilterBar from "../components/filterBar";
import events from "../data/events";
function Events(){
    const[search,setSearch]=useState("")
    const[category,setCategory]=useState("All")



const filteredEvents = events.filter((event) => {
  const matchesSearch = event.title
    .toLowerCase()
    .includes(search.toLowerCase())

  const matchesCategory =
    category === "All" || event.category === category

  return matchesSearch && matchesCategory
})


    return(
        <>
        <div className="events-page">
        <h1>College events</h1>
        <SearchBar
        search={search}
        setSearch={setSearch}
        />
        <FilterBar
        category={category}
        setCategory={setCategory}
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
