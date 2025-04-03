import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./feature/ui/AppLayout";
import Home from "./feature/ui/Home";
import Order, {
  action as orderAction,
  loader as orderLoader,
} from "./feature/order/Order";
import Cart from "./feature/cart/Cart";
import Error from "./feature/ui/Error";
import Menu, { loader as menuLoader } from "./feature/menu/Menu";
import CreateOrder, {
  action as createOrderAction,
} from "./feature/order/CreateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/new",
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: orderAction,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
