import AppRoutes from "./AppRoutes"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import axios from "axios"

axios.defaults.withCredentials = true

const App = () => {

  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
