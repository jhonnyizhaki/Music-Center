import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

const Navbar = () => {
  const { user, logout } = useAuth()
  const [page, setPage] = useState("home")
  const { cartItems } = useCart()

  return (
    <nav className="navbar">
      <div>
        <Link
          to="/"
          onClick={() => setPage("home")}
          className={`${page === "home" ? "itsTheCurrentPage" : "white"}`}
        >
          Home
        </Link>
        <Link
          to="/instruments"
          onClick={() => setPage("instruments")}
          className={`${page === "instruments" ? "itsTheCurrentPage" : "white"}`}
        >
          Products
        </Link>
        <Link
          to="/studios"
          onClick={() => setPage("studios")}
          className={`${page === "studios" ? "itsTheCurrentPage" : "white"}`}
        >
          Studios
        </Link>
        <Link
          to="/shopcart"
          onClick={() => setPage("shopcart")}
          className={`cart-icon ${page === "shopcart" ? "itsTheCurrentPage" : "white"}`}
        >
          <img src="cart-icon.svg" alt="Cart" />
          {/* {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length} </span>
          )} */}
        </Link>
      </div>

      <div>
        {user ? (
          <>
            <span className="email">{user.email}</span>
            <button className="logoutBtn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setPage("login")}
              className={`${page === "login" ? "itsTheCurrentPage" : "white"}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setPage("register")}
              className={`${page === "register" ? "itsTheCurrentPage" : "white"}`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
