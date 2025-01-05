import React from "react"
import { Outlet, Link } from "react-router-dom"
import Navbar from "./Navbar"
import urls from "../constant/URLS"

const Layout = () => {
  return (
    <div className="page-layout">
      <video autoPlay muted loop className="video-background">
        <source src={urls.BACKGROUND_VIDEO} type="video/mp4" />
      </video>
      <Link to="/">
        <div className="logo"></div>
      </Link>
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 Center Music. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
