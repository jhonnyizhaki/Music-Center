import axios from "axios"
import React, { useEffect, useState } from "react"
import urls from "../constant/URLS"

export default function SelectInstrumentsCategory({ setSelectedCategory }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(urls.CATEGORIES)
        setCategories(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <select
      className="select"
      onChange={(e) => setSelectedCategory(e.target.value)}
      name="category"
      id="category"
    >
      <option className="option" value="all">
        all
      </option>
      {categories.map((category) => (
        <option className="option" key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  )
}
