import React, { useState, useEffect } from "react"
import axios from "axios"
import SelectInstrumentsCategory from "../components/SelectInstrumentsCategory"
import { useCart } from "../context/CartContext"
import urls from "../constant/URLS"

const Instruments = ({ params }) => {
  const { selectedCategory, setSelectedCategory } = params
  const [instruments, setInstruments] = useState([])
  const [showInstruments, setShowInstruments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart() // שימוש בקונטקסט של העגלה

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await axios.get(urls.INSTRUMENTS)
        setInstruments(response.data)
        setShowInstruments(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching instruments:", error)
        setError("Error loading instruments")
        setLoading(false)
      }
    }

    fetchInstruments()
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") setShowInstruments([...instruments])
    else
      setShowInstruments(
        instruments.filter(
          (instrument) => instrument.category === selectedCategory
        )
      )
  }, [selectedCategory])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="instrumentH1">
      <h1>Instruments</h1>
      <SelectInstrumentsCategory setSelectedCategory={setSelectedCategory} />
      <div className="cards-container">
        {showInstruments.map((instrument) => (
          <InstrumentCard key={instrument._id} instrument={instrument} />
        ))}
      </div>
    </div>
  )
}

export default Instruments

const InstrumentCard = ({ instrument }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleQuantityInputChange = (e) => {
    if (e.target.value > instrument.stock) {
      setQuantity(instrument.stock)
    } else if (e.target.value === "" || e.target.value < 1) {
      setQuantity(1)
    } else {
      setQuantity(e.target.value)
    }
  }

  return (
    <div className="card">
      <img src={instrument.imageUrl} alt={instrument.name} />
      <h3>{instrument.name}</h3>
      <p className="category">{instrument.category}</p>
      <div className="input-container">
        <input
          type="number"
          name="quantity"
          value={quantity}
          min={1}
          max={instrument.stock}
          onChange={handleQuantityInputChange}
        />
        <span className="price">₪{instrument.price * quantity}</span>
      </div>
      <button
        className="add-to-cart"
        onClick={() => addToCart({ instrumentId: instrument._id, quantity })}
      >
        Add to Cart
      </button>
    </div>
  )
}