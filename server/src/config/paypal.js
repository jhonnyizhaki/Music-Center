import { Client, OrdersController, PaymentsController } from "@paypal/paypal-server-sdk";
import "dotenv/config";

// import Paypal from "@paypal/paypal-server-sdk"
// const client = new Paypal.Client({

const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_ID,
    oAuthClientSecret: process.env.PAYPAL_SECRET,
  },
});

const paypal = {
  orders: new OrdersController(paypalClient),
  payments: new PaymentsController(paypalClient),
};

export default paypal;

// connect

// dbOrder => paypalOrder.url => redirect.url => !!! {sucsess , fail} !!!  //server //delete =>error
