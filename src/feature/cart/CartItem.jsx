import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { formatCurrency } from "../utils/helpers";
import {
  decreaseQuantity,
  incrementQuantity,
  deleteCartItem,
} from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  return (
    <li className="flex flex-col justify-between border-b border-stone-300 py-2 sm:flex-row sm:items-center">
      <p className="text-lg text-stone-500">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:w-90">
        <p className="text-sm font-bold text-stone-900">
          {formatCurrency(totalPrice)}
        </p>
        <div className="space-x-3">
          <Button
            onclick={() => dispatch(decreaseQuantity(pizzaId))}
            type={"xsmall"}
          >
            -
          </Button>
          <span>{quantity}</span>
          <Button
            onclick={() => dispatch(incrementQuantity(pizzaId))}
            type={"xsmall"}
          >
            +
          </Button>
        </div>
        <Button
          onclick={() => dispatch(deleteCartItem(pizzaId))}
          type={"small"}
        >
          DELETE
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
