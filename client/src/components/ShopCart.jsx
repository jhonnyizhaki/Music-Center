import { useState } from "react"
import { useCart } from "../context/CartContext"

const ShopCart = () => {
  const { cart } = useCart()
  console.log("Cart data:", cart)
  console.log("First item in cart:", cart?.items?.[0])

  return (
    <div>
      <h1 className="title">Shop Cart</h1>
      <div className="cards-container">
        {cart?.items?.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default ShopCart

const CartItem = ({ item }) => {
  const { updateItemQuantity, removeFromCart } = useCart()
  const [newQuantity, setNewQuantity] = useState(item.quantity)
  const instrument = item.instrumentId

  if (!instrument) return null

  const handleOnClick = (e) => {
    updateItemQuantity(instrument._id, newQuantity)
  }

  const handleDelete = () => {
    removeFromCart(instrument._id)
  }

  const handleQuantityInputChange = (e) => {
    if (e.target.value > instrument.stock) {
      setNewQuantity(instrument.stock)
    } else if (e.target.value === "" || e.target.value < 1) {
      setNewQuantity(1)
    } else {
      setNewQuantity(parseInt(e.target.value))
    }
  }

  return (
    <div className="card">
      <img src={instrument.imageUrl} alt={instrument.name} />
      <h3>{instrument.name}</h3>
      <p className="category">{instrument.category}</p>
      <p className="price">₪{instrument.price}</p>
      <div>
        <input
          type="number"
          min={1}
          max={instrument.stock}
          value={newQuantity}
          onChange={handleQuantityInputChange}
        />
        <button onClick={handleOnClick}>שנה כמות</button>
        <button onClick={handleDelete} className="delete-btn">
          מחק מוצר
        </button>
      </div>
      <p>מחיר כולל: ₪{instrument.price * item.quantity}</p>
    </div>
  )
}
