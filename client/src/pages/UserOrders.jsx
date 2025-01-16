import React, { useEffect, useState } from "react"
import urls from "../constant/URLS"
import axios from "axios"

const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(urls.GET_USER_ORDERS)
        setOrders(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching instruments:", error)
        setError("Error loading instruments")
        setLoading(false)
      }
    }
    fetchOrders()
  })
  return (
    <div>{loading ? <p>loading...</p> : <p>{JSON.stringify(orders)}</p>}</div>
  )
}

export default UserOrders
