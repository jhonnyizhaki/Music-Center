import React, { useEffect, useState } from "react"
import urls from "../constant/URLS"
import axios from "axios"

const UserBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(urls.GET_USER_BOOKING)
        setBookings(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching instruments:", error)
        setError("Error loading instruments")
        setLoading(false)
      }
    }
    fetchBookings()
  })
  return (
    <div>{loading ? <p>loading...</p> : <p>{JSON.stringify(bookings)}</p>}</div>
  )
}

export default UserBookings
