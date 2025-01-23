import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AdminSidebar from "./AdminSidebar"; // Import AdminSidebar

const Navbar = () => {
  const { user } = useAuth();
  const [page, setPage] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const { cart } = useCart();

  const cartItemsCount =
    cart?.items?.reduce((total, item) => total + (item?.quantity || 0), 0) || 0;

  return (
    <>
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
            Instruments
          </Link>

          <Link
            to="/practice-room-booking"
            onClick={() => setPage("bookings")}
            className={`${page === "bookings" ? "itsTheCurrentPage" : "white"}`}
          >
            Practice Room
          </Link>
          {user && (
            <Link
              to="/shop-cart"
              onClick={() => setPage("shop-cart")}
              className={`cart-icon-container ${page === "shop-cart" ? "itsTheCurrentPage" : "white"}`}
            >
              {cartItemsCount > 0 && (
                <span className="cart-counter">{cartItemsCount}</span>
              )}
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
          )}
        </div>

        <div>
          {user ? (
            <div className="flex">
              <span className="email">{user.email}</span>

              <Link
                onClick={() => setPage("profile")}
                to="/profile"
                className={`cart-icon-container ${page === "profile" ? "itsTheCurrentPage" : "white"}`}
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
                  className="lucide lucide-user-round"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </Link>
              {user.role === "admin" && (
                <span
                  className={`${page === "admin" ? "itsTheCurrentPage" : "white"} link`}
                  onClick={() => {
                    setIsSidebarOpen(true); // Open the sidebar
                    setPage("admin");
                  }}
                >
                  Admin
                </span>
              )}
            </div>
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

      {/* Display the sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default Navbar;
