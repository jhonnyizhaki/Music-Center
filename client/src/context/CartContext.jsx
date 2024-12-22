import React, { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // הוספה לעגלה
  const addToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  // הסרה מהעגלה
  const removeFromCart = (product) => {
    setCartItems(cartItems.filter(item => item !== product))
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
