const BASE_URL = "http://localhost:5000"

export default {
    BASE_URL,
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REGISTER: `${BASE_URL}/auth/register`,
    VERIFY: `${BASE_URL}/auth/verify`,
    INSTRUMENTS: `${BASE_URL}/instruments`,
    CATEGORIES: `${BASE_URL}/categories`,
    CART: `${BASE_URL}/carts`,
    ADD_TO_CART: `${BASE_URL}/carts`,
    UPDATE_CART_ITEM_QUANTITY: `${BASE_URL}/carts`,
    REMOVE_FROM_CART: `${BASE_URL}/carts`,
    CREATE_ORDER: `${BASE_URL}/orders/add`
}