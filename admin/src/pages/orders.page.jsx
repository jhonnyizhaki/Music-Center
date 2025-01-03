import useOrdersPage from "../hooks/orders-page.hook";
import { BiTrash, BiX } from "react-icons/bi";
import { MdEditNote } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

function OrdersPage() {
  const ordersHook = useOrdersPage();

  return (
    <div className="card w-full h-1/2 overflow-hidden">
      <div className="grid grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">
        {ordersHook.orders.length ? (
          <>
            <dialog id="show-order-modal" className="modal">
              <div className="modal-box">
                {ordersHook.orderToShow && (
                  <div className="card w-full h-full bg-base-100 ">
                    <div className="card-body flex flex-col gap-5 ">
                      <h2 className="card-title">
                        {ordersHook.orderToShow._id}
                        <div className="badge badge-secondary">
                          {ordersHook.orderToShow.totalPrice}₪
                        </div>
                      </h2>
                      <div className="card-actions ">
                        <div className="badge badge-outline">
                          {ordersHook.orderToShow.userId.name}
                        </div>
                        <div className="badge badge-outline">
                          {ordersHook.orderToShow.userId.email}
                        </div>
                      </div>
                      <div className="flex flex-col gap-7">
                        {ordersHook.orderToShow.items.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <div className="avatar">
                              <div className="mask mask-squircle w-10">
                                <img src={item.instrumentId.imageUrl} />
                              </div>
                            </div>
                            <span>{item.quantity}</span>
                            <span>{item.instrumentId.name}</span>
                            <span>{item.instrumentId.price}₪</span>
                            <button
                              className="btn btn-sm  btn-error btn-square"
                              onClick={() =>
                                ordersHook.actions.deleteINstrumentFromOrder(
                                  ordersHook.orderToShow._id,
                                  item.instrumentId._id
                                )
                              }
                            >
                              <BiX size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            {ordersHook.orders.map((order, i) => (
              <div key={i} className="card ">
                <div className="card bg-base-100  shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-xs">{order._id}</h2>
                    <p>
                      {order.userId.name} {order.userId.email}
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-sm  btn-square">
                        <MdEditNote size={20} />
                      </button>

                      <button
                        className="btn btn-sm btn-square"
                        onClick={() => ordersHook.actions.showOrder(order._id)}
                      >
                        <AiOutlineEye size={20} />
                      </button>
                      <button
                        className="btn btn-sm  btn-error btn-square"
                        onClick={() => ordersHook.actions.showOrder(order._id)}
                      >
                        <BiTrash size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No orders</p>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
