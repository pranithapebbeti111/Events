
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                alert("Registration successful! Please login.")
                navigate("/login")
            } else {
                setMessage(data.message)
            }

        } catch (error) {
            setMessage("Unable to connect to server")
        }
    }

    return (
        <div className="auth-page">
            <h1>Student Registration</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}

            <p>
                Already registered? <Link to="/login">Login here</Link>
            </p>
        </div>
    )
}

export default Register
