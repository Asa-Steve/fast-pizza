import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../ui/Button";
import { createOrder } from "../utils/apiRestaurant";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const {
    username,
    status,
    address,
    position,
    error: addressError,
  } = useSelector((state) => state.user);

  const isLoadingAddress = status === "loading";
  const dispatch = useDispatch();

  console.log(addressError);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const errors = useActionData();

  async function handleFetchPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (cart.length < 1)
    return (
      <div className="m-auto mt-7 max-w-200">
        <Button to="/menu" type={"link"}>
          &larr; Back to menu
        </Button>
        <h1 className="mt-10 font-bold text-stone-600">
          Your cart is still empty. Start adding some pizzas :)
        </h1>
      </div>
    );

  return (
    <div className="mx-auto mt-10 max-w-200 px-2">
      <h2 className="my-5 text-2xl font-semibold sm:text-3xl">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="flex flex-col gap-y-2 md:flex-row">
          <label className="md:basis-40">First Name</label>
          <input
            className="w-full rounded-full border border-stone-300 px-4 py-2.5 text-sm focus:ring focus:ring-blue-700 focus:ring-offset-1 focus:outline-0 sm:py-3"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="my-5 flex flex-col items-baseline gap-y-2 md:flex-row">
          <label className="md:basis-40">Phone number</label>
          <div className="w-full">
            <input
              className="w-full rounded-full border border-stone-300 px-4 py-2.5 text-sm focus:ring focus:ring-blue-700 focus:ring-offset-1 focus:outline-0 sm:py-3"
              type="tel"
              name="phone"
              required
            />
          </div>
          {errors?.phone && <p>{errors.phone}</p>}
        </div>

        <div className="flex flex-col items-baseline gap-y-2 md:flex-row">
          <label className="md:basis-40">Address</label>
          <div className="relative w-full">
            <input
              className="w-full rounded-full border border-stone-300 px-4 py-2.5 text-sm focus:ring focus:ring-blue-700 focus:ring-offset-1 focus:outline-0 sm:py-3"
              type="text"
              name="address"
              defaultValue={address}
              required
            />
            <div className="sm:right-0.2 absolute top-[2px] right-0.5 w-fit rounded-full">
              {
                <Button
                  onclick={handleFetchPosition}
                  type={"primary"}
                  disabled={isLoadingAddress}
                >
                  Get position
                </Button>
              }
            </div>
            {addressError && (
              <p className="mt-5 rounded-sm bg-red-100 py-2 pl-4 text-xs text-red-500">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 mb-3 flex items-center space-x-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-blue-900 focus:ring focus:ring-blue-700 focus:ring-offset-2 focus:outline-0"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div className="mt-10 py-1">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type={"primary"}>
            {isSubmitting ? "Placing Order" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on" ? true : false,
  };

  const errors = {};

  if (!isValidPhone(newOrder?.phone)) {
    errors.phone = "kindly provide a valid phone number";
    return errors;
  }

  const order = await createOrder(newOrder);

  return redirect(`/order/${order.id}`);
}

export default CreateOrder;
