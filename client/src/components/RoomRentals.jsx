import React, { useState, useEffect } from "react"
import axios from "axios"

const RoomRentals = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("BASE_URL/rooms")
        setRooms(response.data)
        setLoading(false)
      } catch (error) {
        console.error("שגיאה בטעינת החדרים:", error)
        setError("שגיאה בטעינת החדרים")
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  if (loading) return <div>טוען...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h1>חדרי חזרות להשכרה</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <span>{room.name}</span>
            <span>${room.price} לשעה</span>
            <p>{room.description}</p>
            <button className="button">הזמן עכשיו</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RoomRentals
