// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../utils/apiRestaurant";
import { calcMinutesLeft, formatCurrency, formatDate } from "../utils/helpers";
import OrderItem from "./OrderItem";
import Button from "../ui/Button";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  
  const isMakingPriority = fetcher.state === "submitting";

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
    <div className="m-auto max-w-200 pt-7">
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

      <div className="mx-auto my-3 mt-10 block bg-stone-200/60 px-8 py-4 sm:flex sm:w-full sm:items-center sm:justify-between sm:py-6">
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
            <OrderItem key={item.pizzaId} item={item} />
          ))}
        </ul>
      </div>
      <div className="mx-auto mt-10 w-full space-y-2 bg-stone-200/60 px-8 py-4">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold text-stone-700">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && (
        <div className="mt-5 text-right">
          <fetcher.Form method="PATCH">
            <Button disabled={isMakingPriority} type={"primary"}>
              Make priority
            </Button>
          </fetcher.Form>
        </div>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const data = await getOrder(params.orderId);
  return data;
}
export async function action({ params }) {
  await updateOrder(params?.orderId, { priority: true });
  return null;
}

export default Order;
