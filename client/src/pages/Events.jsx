import { useState } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/searchBar";
import FilterBar from "../components/filterBar";
function Events(){
    const[search,setSearch]=useState("")
    const[category,setCategory]=useState("All")
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
