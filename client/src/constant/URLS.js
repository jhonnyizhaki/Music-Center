const BASE_URL = "http://localhost:5000"

export default {
    BASE_URL,
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    VERIFY: `${BASE_URL}/auth/verify`,
    INSTRUMENTS: `${BASE_URL}/instruments`,
    CATEGORIES: `${BASE_URL}/categories`,
    CART: `${BASE_URL}/cart`,
    ADD_TO_CART: `${BASE_URL}/cart`,
    UPDATE_CART_ITEM_QUANTITY: `${BASE_URL}/cart`,
    REMOVE_FROM_CART: `${BASE_URL}/cart`,
}