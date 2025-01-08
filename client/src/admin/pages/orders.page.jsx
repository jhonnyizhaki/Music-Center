import useOrdersPage from "../hooks/orders-page.hook";
import { BiX } from "react-icons/bi";
import { FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";

function OrdersPage() {
  const ordersHook = useOrdersPage();

  return (
    <div className="card w-full h-4/5 overflow-hidden border-2 border-base-300 rounded-xl">
      <div className="grid grid-cols-4 xl:grid-cols-5 gap-4 p-6">
        {ordersHook.orders.length ? (
          <>
            <OrderDialog ordersHook={ordersHook} />
            {ordersHook.orders.map((order, i) => (
              <div key={i}>
                <OrderCard order={order} ordersHook={ordersHook} />
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

function OrderCard({ ordersHook, order }) {
  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden">
      <div className="card-body flex flex-col gap-5">
        <h2 className="card-title text-xs flex overflow-x-auto scrollbar-hide">
          <span className="shrink-0">Order ID: </span>
          <span className="whitespace-nowrap">{order._id}</span>
        </h2>
        <div className="bg-base-200 p-2 rounded-lg">
          <div className="font-light flex gap-4 overflow-hidden">
            <span className="shrink-0">name:</span>
            <span className="truncate">{order.userId.name}</span>
          </div>
          <div className="font-light flex gap-4 overflow-x-auto scrollbar-hide">
            <span className="shrink-0">email:</span>
            <span className="whitespace-nowrap">{order.userId.email}</span>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-square"
            onClick={() => ordersHook.actions.onChangeShownOrder(order._id)}
          >
            <FiEye size={18} />
          </button>
          <button
            className="btn btn-sm  btn-error btn-square"
            onClick={() => ordersHook.actions.onDeleteOrder(order._id)}
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderDialog({ ordersHook }) {
  return (
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
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Amount</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersHook.orderToShow.items.map((item, i) => (
                      <tr key={i}>
                        <th className="avatar">
                          <div className="mask mask-squircle w-10">
                            <img src={item.instrumentId.imageUrl} />
                          </div>
                        </th>
                        <th>
                          {ordersHook.selectedInstrumentId ===
                            item.instrumentId._id ? (
                            <input
                              className="input input-bordered input-sm w-14"
                              type="number"
                              value={ordersHook.updatedQuantity}
                              onChange={ordersHook.actions.onChangeQuantity}
                            />
                          ) : (
                            item.quantity
                          )}
                        </th>
                        <th>{item.instrumentId.name}</th>
                        <th>{item.instrumentId.price}₪</th>
                        <th>
                          {ordersHook.selectedInstrumentId ===
                            item.instrumentId._id ? (
                            <button
                              className="btn btn-sm btn-success  btn-square"
                              onClick={
                                ordersHook.actions.onUpdateInstrumentQuantity
                              }
                            >
                              <IoCheckmark size={20} />
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm   btn-square"
                              onClick={() =>
                                ordersHook.actions.onUpdateInstrument(
                                  item.instrumentId._id
                                )
                              }
                            >
                              <FiEdit3 size={16} />
                            </button>
                          )}
                        </th>
                        <th>
                          <button
                            className="btn btn-sm  btn-error btn-square"
                            onClick={() => ordersHook.actions.onRemoveInstrument(
                              ordersHook.orderToShow._id,
                              item.instrumentId._id
                            )}
                          >
                            <BiX size={20} />
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default OrdersPage;
