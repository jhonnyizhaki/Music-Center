import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import urls from "../constant/URLS"
import { useAuth } from "./AuthContext" // ✅ הוספתי – כדי לדעת מתי המשתמש מחובר

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const { user } = useAuth() // ✅ הוספתי – כדי לבדוק מתי המשתמש קיים

  const fetchUserCart = async () => {
    try {
      const { data } = await axios.get(urls.CART)
      setCart(data.cart)
    } catch (error) {
      setCart(null)
      console.error(error)
    }
  }

  const addToCart = async (addToCartData) => {
    try {
      const { data } = await axios.post(urls.ADD_TO_CART, addToCartData)
      console.log(data)
      fetchUserCart()
    } catch (error) {
      console.error(error)
    }
  }

  const updateItemQuantity = async (instrumentId, quantity) => {
    try {
      await axios.put(`${urls.UPDATE_CART_ITEM_QUANTITY}/${instrumentId}`, {
        quantity,
      })
      await fetchUserCart()
    } catch (error) {
      console.error(error)
    }
  }

  const removeFromCart = async (instrumentId) => {
    try {
      if (!urls.REMOVE_FROM_CART) {
        throw new Error("Remove from cart URL is not defined")
      }

      console.log(
        "Removing item with URL:",
        `${urls.REMOVE_FROM_CART}/${instrumentId}`
      )

      const response = await axios.delete(
        `${urls.REMOVE_FROM_CART}/${instrumentId}`
      )

      if (response.status === 200) {
        await fetchUserCart()
      }
    } catch (error) {
      console.error("Error removing item from cart:", error)
    }
  }

  const clearCart = async () => {
    try {
      const response = await axios.put(`${urls.CART}/clear`)
      setCart(response.data.cart)
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  // ✅ שינוי משמעותי – טוען את העגלה רק אחרי ש-user קיים (כלומר אחרי התחברות ואימות)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

    if (user) { // ✅ טוען את העגלה רק כשהמשתמש אומת בהצלחה
      fetchUserCart()
    }
  }, [user]) // ✅ יופעל כל פעם ש-user משתנה (למשל אחרי login)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        clearCart,
        fetchUserCart,
        totalPrice: cart?.items?.length
          ? cart.items.reduce(
              (total, item) =>
                total +
                (item?.instrumentId?.price || 0) * (item?.quantity || 0),
              0
            )
          : 0,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
