// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../utils/apiRestaurant";
import { calcMinutesLeft, formatCurrency, formatDate } from "../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mt-7 max-w-200 m-auto">
      <div className="flex flex-wrap items-center justify-between gap-y-2 font-bold text-slate-500">
        <h2 className="text-xl">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-4 py-1 text-sm text-slate-100 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-4 py-1 text-sm text-slate-100 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="mx-auto my-3 mt-10 block bg-stone-200/60 px-8 py-4 sm:w-full sm:flex sm:items-center sm:justify-between sm:py-6">
        <p className="text-md font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <div>
        <ul className="px-2">
          {cart?.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
      <div className="mx-auto my-3 mt-10 bg-stone-200/60 px-8 py-4 space-y-2 w-full">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold text-stone-700">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const data = await getOrder(params.orderId);
  return data;
}

export default Order;
