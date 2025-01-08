import Cookies from "js-cookie";

const user = JSON.parse(decodeURI(Cookies.get("user") || "null"));
export default user;
