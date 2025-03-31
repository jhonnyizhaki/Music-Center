import { Verified } from "@mui/icons-material"

const BASE_URL = "http://localhost:5000"

const urls = {
  BASE_URL,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REGISTER: `${BASE_URL}/auth/register`,
  VERIFY: `${BASE_URL}/auth/verify`,
  INSTRUMENTS: `${BASE_URL}/instruments`,
  RENTINSTRUMENTS: `${BASE_URL}/rentInstruments`,
  CATEGORIES: `${BASE_URL}/categories`,
  CART: `${BASE_URL}/cart`,
  ADD_TO_CART: `${BASE_URL}/cart/add`,
  UPDATE_CART_ITEM_QUANTITY: `${BASE_URL}/cart/update`,
  REMOVE_FROM_CART: `${BASE_URL}/cart/remove`,
  CREATE_ORDER: `${BASE_URL}/orders/add`,
  GET_USER_ORDERS: `${BASE_URL}/orders/userOrders`,
  CREATE_BOOKING: `${BASE_URL}/bookings`,
  GET_USER_BOOKING: `${BASE_URL}/bookings/userBookings`,
  GET_UNAVAILABLE_DATES: `${BASE_URL}/bookings/getUnavailable`,
  UPDATE_USER_ROLE: `${BASE_URL}/admin/updateUserRole`,
  DELETE_USER: `${BASE_URL}/admin/deleteUser`,
  BOOKINGS: `${BASE_URL}/bookings/admin/getBookings`,

  ORDERS: `${BASE_URL}/orders`,
  ROOMS: `${BASE_URL}/rooms`,
  ADMIN: {
    STATS: `${BASE_URL}/admin/stats`,
    LOGS: `${BASE_URL}/admin/logs`,
    ROOMS: `${BASE_URL}/admin/rooms`,
    CONSULTATIONS: `${BASE_URL}/admin/consultations`,
  },
  CONTACT: `${BASE_URL}/contact`,
  CONSULTATIONS: `${BASE_URL}/consultations`,
}

export default urls
