import {Client} from "@paypal/paypal-server-sdk"
// import paypal from "@paypal/paypal-server-sdk"
// const client = new paypal.Client({
const paypal = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: process.env.PAYPAL_ID,
      oAuthClientSecret: process.env.PAYPAL_SECRET
    },      
});

export default paypal

// connect

// dbOrder => paypalOrder.url => redirect.url => !!! {sucsess , fail} !!!  //server //delete =>error 