function Navbar(){
    return(
        <nav className="nav-bar">

            <h2>College Events</h2>
            <div>
                <button href="/">Home</button>
                <button href="/events">Events</button>
                <button href="/login">Login</button>
            </div>
        </nav>
    )
}

export default Navbar