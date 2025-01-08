import { useState } from "react"
import { useCart } from "../context/CartContext"
import axios from "axios"
import urls from "../constant/URLS"
const ShopCart = () => {
  const { cart, totalPrice, clearCart } = useCart()

  const handlePurchase = async () => {
    try {
      const reqBody = {
        items: cart?.items.map(({ instrumentId: { _id }, quantity }) => ({
          id: _id,
          quantity,
        })),
      }
      const serverResponse = await axios.post(urls.CREATE_ORDER, reqBody)
      const redirectUrl = serverResponse.data.redirectUrl
      window.location.href = redirectUrl.href
    } catch (error) {
      console.log(error)
    }
  }

  console.log(cart)

  return (
    <div className="shop-cart-page">
      <h1 className="title">Shopping Cart</h1>
      <div className="cart-layout">
        <div className="purchase-info">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-item">
              <span>Items ({cart?.items?.length || 0})</span>
              <span>₪{totalPrice}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="total-price">
            <span>Total:</span>
            <span>₪{totalPrice}</span>
          </div>
          <button className="purchase-button" onClick={handlePurchase}>
            Purchase Now
          </button>
          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
        <div className="cards-container">
          {cart?.items?.map((item, i) => (
            <CartItem key={i} item={item} />
          ))}
        </div>
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
    console.log("Deleting item:", instrument._id)
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="number"
          min={1}
          max={instrument.stock}
          value={newQuantity}
          onChange={handleQuantityInputChange}
          style={{ width: "60px" }}
        />
        <button onClick={handleOnClick} className="edit-btn">
          Change Quantity
        </button>
        <img
          src="/bin.png"
          alt="delete"
          onClick={() => handleDelete()}
          style={{
            cursor: "pointer",
            width: "30px",
            height: "30px",
          }}
        />
      </div>
      <p>Total Price: ₪{instrument.price * item.quantity}</p>
    </div>
  )
}
// _id
// Object
// name
// "Mandolin"
// price
// 350
// category
// "String instruments"
// imageUrl
// "https://eastwoodguitars.com/cdn/shop/products/mando_8016d7bb-8b94-44e7…"
// stock
// 12
