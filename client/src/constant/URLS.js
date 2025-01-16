const BASE_URL = "http://localhost:5000"
const BACKGROUND_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"

export default {
  BASE_URL,
  BACKGROUND_VIDEO: "/videos/your-video-file.mp4",
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REGISTER: `${BASE_URL}/auth/register`,
  VERIFY: `${BASE_URL}/auth/verify`,
  INSTRUMENTS: `${BASE_URL}/instruments`,
  RENTINSTRUMENTS: `${BASE_URL}/rentinstruments`,
  CATEGORIES: `${BASE_URL}/categories`,
  CART: `${BASE_URL}/cart`,
  ADD_TO_CART: `${BASE_URL}/cart/add`,
  UPDATE_CART_ITEM_QUANTITY: `${BASE_URL}/cart/update`,
  REMOVE_FROM_CART: `${BASE_URL}/cart/remove`,
  CREATE_ORDER: `${BASE_URL}/orders/add`,
  GET_USER_ORDERS: `${BASE_URL}/orders/userOrders`,
  CREATE_BOOKING: `${BASE_URL}/bookings`,
  GET_USER_BOOKING: `${BASE_URL}/bookings/userBookings`,
}
