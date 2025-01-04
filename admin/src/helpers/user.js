import Cookies from "js-cookie";

const user = JSON.parse(Cookies.get("user") || "null");
export default user;
