import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { NotificationProvider } from "./context/NotificationContext"
import { RealTimeProvider } from "./context/RealTimeContext"
import AppRoutes from "./routes/AppRoutes"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import axios from "axios"

axios.defaults.withCredentials = true

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <RealTimeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AppRoutes />
            </LocalizationProvider>
          </RealTimeProvider>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
