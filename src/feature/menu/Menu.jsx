import { useLoaderData } from "react-router-dom";
import { getMenu } from "../utils/apiRestaurant";
import MenuItem from "./MenuItem";
function Menu() {
  const pizzas = useLoaderData();

  return (
    <>
      <ul className="m-auto max-w-200 divide-y-2 divide-blue-100/50">
        {pizzas.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  const data = await getMenu();
  return data;
}

export default Menu;
