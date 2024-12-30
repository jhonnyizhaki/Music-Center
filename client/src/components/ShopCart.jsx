import { useState } from "react"
import { useCart } from "../context/CartContext"
import axios from "axios"
import urls from "../constant/URLS"
const ShopCart = () => {
  const { cart } = useCart()

  const handlePurchase = async () => {
    try {
      const reqBody = {
        items: cart?.items.map(({ instrumentId: { _id }, quantity }) => ({
          id: _id,
          quantity
        }))
      }
      const serverResponse = await axios.post(urls.CREATE_ORDER, reqBody)
      const redirectUrl = serverResponse.data.redirectUrl
      window.location.href = redirectUrl.href
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1 className="title">Shop Cart</h1>
      <div className="cards-container">
        {cart?.items?.map((item, i) => (
          <div key={i}>
            <CartItem item={item} />
          </div>
        ))}
      </div>
      <div className="wf">

        <button
          className="botton"
          onClick={handlePurchase}
        >Submit</button>
      </div>
    </div>
  )
}

export default ShopCart


const CartItem = ({ item, key }) => {
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