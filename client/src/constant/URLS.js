import { Verified } from "@mui/icons-material"

const BASE_URL = "http://localhost:5000"

const urls = {
  BASE_URL,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REGISTER: `${BASE_URL}/auth/register`,
  VERIFY:`${BASE_URL}/auth/verify`,
  INSTRUMENTS: `${BASE_URL}/instruments`,
  RENTINSTRUMENTS: `${BASE_URL}/rent-instruments`,
  CATEGORIES: `${BASE_URL}/categories`,
  CART: `${BASE_URL}/cart`,
  ADD_TO_CART: `${BASE_URL}/cart/add`,
  UPDATE_CART_ITEM_QUANTITY: `${BASE_URL}/cart/update`,
  REMOVE_FROM_CART: `${BASE_URL}/cart/remove`,
  CREATE_ORDER: `${BASE_URL}/orders/add`,
  GET_USER_ORDERS: `${BASE_URL}/orders/userOrders`,
  CREATE_BOOKING: `${BASE_URL}/bookings`,
  GET_USER_BOOKING: `${BASE_URL}/bookings/userBookings`,


    
  ORDERS: `${BASE_URL}/orders`,
  ROOMS: `${BASE_URL}/rooms`,
  ADMIN: {
    STATS: `${BASE_URL}/admin/stats`,
    USERS: `${BASE_URL}/admin/users`,
    LOGS: `${BASE_URL}/admin/logs`,
    ROOMS: `${BASE_URL}/admin/rooms`,
    CONSULTATIONS: `${BASE_URL}/admin/consultations`,
  },
  CONTACT: `${BASE_URL}/contact`,
  CONSULTATIONS: `${BASE_URL}/consultations`,
  // TODO: change to real rent-instruments in server
}

export default urls
