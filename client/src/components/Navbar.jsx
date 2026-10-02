import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar(){
    const navigate = useNavigate();
    const { user, logout } = useAuth()
    return(
        <nav className="nav-bar">

            <h2>College Events</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/my-events">My Events</Link>
                {user ? (
                    <>
                    <span>Welcome, {user.email}</span>
                    <button onClick={logout}>Logout</button>
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