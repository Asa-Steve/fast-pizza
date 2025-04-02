import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalPrice, getCartTotalItem } from "./cartSlice";
import { formatCurrency } from "../utils/helpers";
function CartOverview() {
  const cartTotalPrice = useSelector(getCartTotalPrice);
  const cartTotalItem = useSelector(getCartTotalItem);

  if (!cartTotalItem) return null;
  return (
    <div className="flex items-center justify-between bg-black px-4 py-3 text-slate-100">
      <p className="space-x-3">
        <span>{cartTotalItem} pizzas</span>
        <span>{formatCurrency(cartTotalPrice)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
