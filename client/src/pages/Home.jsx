import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <section className="hero">
        <h1>Discover College Events</h1>
        <br />
        <p>
          Participate, connect and experience the best events
          happening on campus.
        </p>

        <button onClick={() => navigate("/events")}>
          Explore Events
        </button>
      </section>
    </div>
  )
}

export default Home