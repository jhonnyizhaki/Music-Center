import React from "react"
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import "../AdminSidebar.css"
import axios from "axios"
import urls from "../constant/URLS"

const UserSidebar = ({ isOpen, closeSidebar }) => {
  const handleLogout = async () => {
    await axios.post(urls.LOGOUT)
    localStorage.removeItem("user")

    window.location.href = "/login"
  }

  return (
    <Drawer anchor="left" open={isOpen} onClose={closeSidebar}>
      <div className="sidebar" inert={!isOpen ? "inert" : undefined}>
        <Typography variant="h5" className="sidebar-header">
          personal area
        </Typography>
        <List>
          <ListItem button component={NavLink} to="/" onClick={closeSidebar}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/user-orders"
            onClick={closeSidebar}
          >
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/user-bookings"
            onClick={closeSidebar}
          >
            <ListItemText primary="Bookings" />
          </ListItem>

          <ListItem
            button
            component={NavLink}
            to="/faq"
            onClick={closeSidebar}
          >
            <ListItemText primary="FAQ" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/contact"
            onClick={closeSidebar}
          >
            <ListItemText primary="contact" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}

export default UserSidebar
