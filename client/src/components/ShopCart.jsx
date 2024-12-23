import { useState } from "react"
import { useCart } from "../context/CartContext"

const ShopCart = () => {
  const { cart } = useCart()

  return (
    <div>
      <h1 className="title">Shop Cart</h1>
      <div className="cards-container">
        {cart?.items.map(({ instrumentId: inst, quantity }) => {
          return <CartItem key={inst._id} item={{ ...inst, quantity }} />
        })}
      </div>
    </div>
  )
}

export default ShopCart

const CartItem = ({ item }) => {
  const { updateItemQuantity } = useCart()
  const [newQuantity, setNewQuantity] = useState(item.quantity)
  const handleOnCLick = (e) => {
    updateItemQuantity(item._id, newQuantity)
  }

  const handleQuantityInputChange = (e) => {
    if (e.target.value > item.stock) {
      setNewQuantity(item.stock)
    } else if (e.target.value === "" || e.target.value < 1) {
      setNewQuantity(1)
    } else {
      setNewQuantity(e.target.value)
    }
  }

  return (
    <div className="card">
      <img src={item.imageUrl} alt={item.name} />
      <h3>{item.name}</h3>
      <p className="category">{item.category}</p>
      <p className="price">₪{item.price}</p>
      <div>
        <input
          type="number"
          min={1}
          max={item.stock}
          value={newQuantity}
          onChange={handleQuantityInputChange}
        />
        <button onClick={handleOnCLick}>change quantity</button>
      </div>
      <p>Total price: ₪{item.price * item.quantity}</p>
    </div>
  )
}
