import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { SERVER_URL } from "../helpers/consts";
function useOrdersPage() {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [shownOrderId, setShownOrderId] = useState("");
  const orderToShow = useMemo(
    () => orders.find((order) => order._id === shownOrderId),
    [orders, shownOrderId]
  );
  useEffect(() => {
    (async () => {
      await actions.init();
    })();
  }, []);

  const actions = {
    init: async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/orders`, {
          withCredentials: true,
        });
        const data = response.data.orders;
        setOrders(data);
        return data;
      } catch (error) {
        setError(error);
      }
    },
    showOrder: async (id) => {
      setShownOrderId(id);
      document.getElementById("show-order-modal").showModal();
    },
    deleteINstrumentFromOrder: async (orderId, instrumentId) => {
      try {
        await axios.delete(`${SERVER_URL}/orders/deleteINstrumentFromOrder`, {
          data: { orderId, instrumentId },
          withCredentials: true,
        });
        const newOrders = orders.map((order) => {
          if (order._id === orderId) {
            order.items = order.items.filter(
              (item) => item.instrumentId._id !== instrumentId
            );
          }
          return order;
        });
        setOrders([...newOrders]);
      } catch (error) {
        setError(error);
      }
    },

    deleteOrder: async (id) => {
      try {
        await axios.delete(`${SERVER_URL}/orders`, {
          data: { id },
          withCredentials: true,
        });
        const newOrders = orders.filter((order) => order._id !== id);
        setOrders(newOrders);
      } catch (error) {
        setError(error);
      }
    },
  };

  return {
    error,
    orders,
    actions,
    shownOrderId,
    setError,
    setOrders,
    setShownOrderId,
    orderToShow,
  };
}

export default useOrdersPage;
