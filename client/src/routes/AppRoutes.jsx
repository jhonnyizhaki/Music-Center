import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminRoutes from "./AdminRoutes.jsx"
import Layout from "../components/Layout.jsx"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Instruments from "../pages/Instruments.jsx"
import ShopCart from "../components/ShopCart.jsx"
import Home from "../pages/Home.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import PracticeRoomBooking from "../components/PracticeRoomBooking.jsx"
import AdminSidebar from "../components/AdminSidebar.jsx"
import About from "../pages/About.jsx"
import Contact from "../pages/Contact.jsx"
import ProtectedRoute from "../components/ProtectedRoute.jsx"
import AdminDashboard from "../pages/admin/AdminDashboard.jsx"
import AdminOrders from "../pages/admin/AdminOrders.jsx"
import AdminUsers from "../pages/admin/AdminUsers.jsx"
import AdminRooms from "../pages/admin/AdminRooms.jsx"
import AdminStats from "../pages/admin/AdminStats.jsx"
import AdminCategories from "../pages/admin/AdminCategories.jsx"
import AdminProducts from "../pages/admin/AdminProducts.jsx"
import { useState } from "react"
import AdminActivityLog from "../components/AdminActivityLog.jsx"
import NotFoundPage from "../../NotFoundPage.jsx"
export default function AppRoutes() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="instruments"
            element={
              <Instruments params={{ selectedCategory, setSelectedCategory }} />
            }
          />
          <Route path="shop-cart" element={<ShopCart />} />
          <Route
            path="practice-room-booking"
            element={<PracticeRoomBooking />}
          />
          <Route path="admin-sidebar" element={<AdminSidebar />} />
<Route path="about" element={<About />} />

          <Route
            path="admin/"
            // element={
            //   <ProtectedRoute requiredRole="admin">
                
            //   </ProtectedRoute>
            // }
            >
               <Route index element={<AdminDashboard />} />
               <Route path="orders" element={<AdminOrders />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="rooms" element={<AdminRooms />} />
      <Route path="stats" element={<AdminStats />} />
      <Route path="edit-category" element={<AdminCategories />} />
      <Route path="edit-products" element={<AdminProducts />} />
      <Route path="admin-activity" element={<AdminActivityLog />} />
            </Route>
       


          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
<Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
