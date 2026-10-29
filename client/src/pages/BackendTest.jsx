import { useEffect, useState } from "react"

function BackendTest() {
  const [message, setMessage] = useState("Loading...")
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed")
        }

        return response.json()
      })
      .then((data) => {
        setMessage(data.message)
      })
      .catch(() => {
        setError("Could not connect to the backend.")
      })
  }, [])

  return (
    <div>
      <h1>Backend Connection Test</h1>

      {error ? <p>{error}</p> : <p>{message}</p>}
    </div>
  )
}

export default BackendTest