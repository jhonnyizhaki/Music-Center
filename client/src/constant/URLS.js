const BASE_URL = "http://localhost:5000"

export default {
  BASE_URL,
  LOGIN: `${BASE_URL}/api/auth/login`,
  LOGOUT: `${BASE_URL}/api/auth/logout`,
  REGISTER: `${BASE_URL}/api/auth/register`,
  VERIFY: `${BASE_URL}/api/auth/verify`,
  INSTRUMENTS: `${BASE_URL}/api/instruments`,
  CATEGORIES: `${BASE_URL}/api/categories`,
  CART: `${BASE_URL}/api/cart`,
  ADD_TO_CART: `${BASE_URL}/api/cart/add`,
  UPDATE_CART_ITEM_QUANTITY: `${BASE_URL}/api/cart/update`,
  REMOVE_FROM_CART: `${BASE_URL}/api/cart/remove`,
  CREATE_ORDER: `${BASE_URL}/api/orders/add`,
}
