import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import urls from "../constant/URLS"

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
      const { data } = await axios.put(
        `${urls.UPDATE_CART_ITEM_QUANTITY}/${instrumentId}`,
        { quantity }
      )
      fetchUserCart()
    } catch (error) {
      console.error(error)
    }
  }

  // הסרה מהעגלה
  // const removeFromCart = (product) => {
  //   setCartItems(cartItems.filter((item) => item !== product))
  // }
  const removeFromCart = (product) => {
    for (let item of cartItems) {
      if (item.count > 1) {
        item.count--
        return setCartItems([...cartItems])
      }
    }
    setCartItems(cartItems.filter((item) => item !== product))
  }

  useEffect(() => {
    fetchUserCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  )
}
