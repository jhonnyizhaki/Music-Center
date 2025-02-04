import React, { useEffect } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import Navbar from "./Navbar"

import Footer from "./Footer"
import { useAuth } from "../context/AuthContext"

const Layout = () => {
  const location = useLocation()
  const { user } = useAuth()

  // useEffect(() => {
  //   const publicPath = ["/login", "/", "/register", "/instruments"]
  //   console.log({ user })
  //   if (!user && !publicPath.includes(window.location.pathname)) {
  //     window.location.pathname = "/login"
  //   }
  // }, [location])

  return (
    <div className="page-layout">
      <Link to="/">
        <div className="logo"></div>
      </Link>
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
