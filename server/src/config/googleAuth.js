import * as arctic from "arctic";
import "dotenv/config";
console.log(process.env.AUTH_REDIRECT_URL, process.env.GOOGLE_CLIENT_ID);

const googleAuth = new arctic.Google(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.AUTH_REDIRECT_URL);

export default googleAuth;
