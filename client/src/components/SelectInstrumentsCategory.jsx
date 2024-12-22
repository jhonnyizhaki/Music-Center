import axios from "axios"
import React, { useEffect, useState } from "react"

export default function SelectInstrumentsCategory({ setSelectedCategory }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/categories")
        setCategories(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <select
      onChange={(e) =>
        setSelectedCategory(e.target.value)
      }
      name="category"
      id="category"
    >
      <option value="all">all</option>
      {categories.map((category) => (
        <option key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  )
}
