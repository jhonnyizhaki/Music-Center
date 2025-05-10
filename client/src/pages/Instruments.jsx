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
  const { addToCart } = useCart() 
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
      <div className="instrumentH1-container">
        <h1 className="instrumentH1-title">Instruments</h1>
      </div>
      <SelectInstrumentsCategory setSelectedCategory={setSelectedCategory} />

      <div className="cards-container">
        {showInstruments.map((instrument, i) => (
          <InstrumentCard key={i} instrument={instrument} />
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
    const value = parseInt(e.target.value)
    if (value > instrument.stock) {
      setQuantity(instrument.stock)
    } else if (isNaN(value) || value < 1) {
      setQuantity(1)
    } else {
      setQuantity(value)
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
        <span className="price">${instrument.price * quantity}</span>
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
