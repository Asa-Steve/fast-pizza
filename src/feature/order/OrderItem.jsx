import { formatCurrency } from "../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex items-center justify-between border-b border-stone-300 py-2">
        <p className="text-stone-500">
          <span className="font-medium text-black">{quantity}&times;</span> {name}
        </p>

        <p className="text-sm font-medium text-stone-900">
          {formatCurrency(totalPrice)}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
