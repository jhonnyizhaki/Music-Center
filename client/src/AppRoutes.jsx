import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import Login from "./pages/Login.jsx"
import Instruments from "./pages/Instruments.jsx"
import ShopCart from "./components/ShopCart.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
import { useAuth } from "./context/AuthContext.jsx"

export default function AppRoutes() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const { user } = useAuth()

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="/instruments" element={<Instruments params={{ selectedCategory, setSelectedCategory }} />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />

                    {user && <Route path="/shopcart" element={<ShopCart params={{ selectedCategory, setSelectedCategory }} />} />
                    }
                </Route>
            </Routes>
        </Router>
    )
}
