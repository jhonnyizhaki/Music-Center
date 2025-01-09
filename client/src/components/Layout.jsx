import React from "react"
import { Outlet, Link } from "react-router-dom"
import Navbar from "./Navbar"

import Footer from "./Footer"

const Layout = () => {
  return (
    <div className="page-layout">
      <Link to="/">
        <div className="logo"></div>
      </Link>
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
     <Footer/>

    </div>
  )
}

export default Layout
