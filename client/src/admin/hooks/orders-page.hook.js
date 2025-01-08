import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { SERVER_URL } from "../helpers/consts";
function useOrdersPage() {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [shownOrderId, setShownOrderId] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);

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

    onChangeShownOrder: async (id) => {
      setShownOrderId(id);
      document.getElementById("show-order-modal").showModal();
    },

    onRemoveInstrument: async (instrumentId) => {
      try {
        await axios.delete(`${SERVER_URL}/orders/deleteInstrumentFromOrder`, {
          data: { orderId: shownOrderId, instrumentId },
          withCredentials: true,
        });
        const newOrders = orders.map((order) => {
          if (order._id === shownOrderId) {
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
    onUpdateInstrument: async (instrumentId) => {
      setSelectedInstrumentId(instrumentId);
      setUpdatedQuantity(
        orders
          .find((order) => order._id === shownOrderId)
          .items.find((item) => item.instrumentId._id === instrumentId).quantity
      );
    },
    onChangeQuantity: (e) => {
      e.preventDefault();
      if (e.target.value < 0) {
        return;
      }
      setUpdatedQuantity(e.target.value);
    },
    onUpdateInstrumentQuantity: async () => {
      try {
        await axios.put(
          `${SERVER_URL}/orders/updateInstrument`,
          {
            orderId: shownOrderId,
            instrumentId: selectedInstrumentId,
            quantity: updatedQuantity,
          },
          { withCredentials: true }
        );
        const newOrders = orders.map((order) => {
          if (order._id === shownOrderId) {
            order.items = order.items.map((item) => {
              if (item.instrumentId._id === selectedInstrumentId) {
                item.quantity = updatedQuantity;
              }
              return item;
            });
          }
          return order;
        });
        setOrders([...newOrders]);
        setSelectedInstrumentId(null);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    },
    onDeleteOrder: async (id) => {
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
    updatedQuantity,
    setUpdatedQuantity,
    selectedInstrumentId,
  };
}

export default useOrdersPage;
