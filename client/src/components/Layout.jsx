import React from "react"
import { Outlet } from "react-router-dom"

import Navbar from "./Navbar"

const Layout = () => {
  return (
    <div className="page-layout">
      <div className="logo"></div>
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
