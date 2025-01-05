import axios from "axios";
import paypal from "../config/paypal.js";
import { CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

async function generateAccessToken() {
  const response = await axios({
    url: PAYPAL_BASE_URL + "/v1/oauth2/token",
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_ID,
      password: process.env.PAYPAL_SECRET,
    },
  });

  return response.data.access_token;
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();

  const response = await axios({
    url: PAYPAL_BASE_URL + `/v2/checkout/orders/${orderId}/capture`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.data;
}

async function createPaypalOrder(email, totalPrice) {
  const order = await paypal.orders.ordersCreate({
    body: {
      intent: CheckoutPaymentIntent.CAPTURE,
      payer: {
        emailAddress: email,
      },

      purchaseUnits: [
        {
          amount: {
            currencyCode: "ILS",
            value: totalPrice.toString(),
          },
        },
      ],
      applicationContext: {
        brandName: "music center",
        cancelUrl: "http://localhost:5000/orders/cancelOrder",
        returnUrl: "http://localhost:5000/orders/approveOrder",
        userAction: "PAY_NOW",
      },
    },
  });
  return order;
}

const payment = { createPaypalOrder, generateAccessToken, capturePayment };

export default payment;
