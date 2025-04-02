import { formatCurrency } from "../utils/helpers";
import Button from "../ui/Button";
import {
  addToCart,
  decreaseQuantity,
  deleteCartItem,
  incrementQuantity,
} from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const quantity = useSelector(
    (state) =>
      state.cart.cart.find((CartItem) => CartItem.pizzaId === id)?.quantity,
  );

  function handleAddToCart() {
    const newPizza = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: 1 * unitPrice,
    };

    dispatch(addToCart(newPizza));
  }

  return (
    <li className="flex py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`w-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex w-full flex-col pt-1 pl-4">
        <p className="text-lg font-bold text-slate-600">{name}</p>
        <p className="text-sm text-slate-800 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm text-slate-700">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-xs font-medium text-gray-600 uppercase">
              Sold out
            </p>
          )}
          <div className="space-x-3">
            {quantity > 0 ? (
              <>
                {" "}
                <Button
                  onclick={() => dispatch(decreaseQuantity(id))}
                  type={"xsmall"}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  onclick={() => dispatch(incrementQuantity(id))}
                  type={"xsmall"}
                >
                  +
                </Button>
              </>
            ) : null}
            {!soldOut && !quantity && (
              <Button onclick={handleAddToCart} type={"small"}>
                Add to cart
              </Button>
            )}
            {quantity && (
              <Button
                onclick={() => dispatch(deleteCartItem(id))}
                type={"small"}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
