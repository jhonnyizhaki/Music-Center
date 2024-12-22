import React, { useState, useEffect } from "react"
import axios from "axios"

const Studios = () => {
  const [studios, setStudios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/studios")
        setStudios(response.data)
        setLoading(false)
      } catch (error) {
        console.error("שגיאה בטעינת האולפנים:", error)
        setError("שגיאה בטעינת האולפנים")
        setLoading(false)
      }
    }

    fetchStudios()
  }, [])

  if (loading) return <div>טוען...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h1>אולפני הקלטות</h1>
      <ul>
        {studios.map((studio) => (
          <li key={studio._id}>
            <span>{studio.name}</span>
            <span>₪{studio.price} לשעה</span>
            <p>{studio.description}</p>
            <div>
              <h3>ציוד:</h3>
              <ul>
                {studio.equipment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <button className="button">הזמן עכשיו</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Studios
