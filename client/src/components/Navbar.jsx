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
          to="/practiceroombooking"
          onClick={() => setPage("bookings")}
          className={`${page === "bookings" ? "itsTheCurrentPage" : "white"}`}
        >
          Practice Room
        </Link>
        <Link
          to="/shopcart"
          onClick={() => setPage("shopcart")}
          className={` ${page === "shopcart" ? "itsTheCurrentPage" : "white"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
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
