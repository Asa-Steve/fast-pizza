import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import { clearCart } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  return (
    <div className="m-auto mt-7 max-w-200">
      <Button to="/menu" type={"link"}>
        &larr; Back to menu
      </Button>

      {cart.length < 1 ? (
        <h1 className=" mt-10 font-bold text-stone-600">
          Your cart is still empty. Start adding some pizzas :)
        </h1>
      ) : (
        <>
          <h2 className="my-5 text-2xl font-semibold sm:text-3xl">
            Your cart, <span className="capitalize">{username}</span>
          </h2>
          <div className="px-2">
            <ul>
              {cart.map((item) => (
                <CartItem key={item.pizzaId} item={item} />
              ))}
            </ul>
          </div>
          <div className="mt-10 space-x-5 py-3">
            <Button type="primary" to="/order/new">
              Order pizzas
            </Button>
            <Button onclick={() => dispatch(clearCart())} type={"secondary"}>
              Clear cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
