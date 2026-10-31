
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        alert("Logged out successfully!")
        navigate("/")
    }

    return (
        <nav className="nav-bar">
            <h2>College Events</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>

                {user && <Link to="/my-events">MyEvents</Link>}

                {user ? (
                    <>
                        <span>Welcome, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
