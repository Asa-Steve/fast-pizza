import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../ui/Loader";
import Header from "./Header";
import CartOverview from "../cart/CartOverview";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="m-auto grid h-dvh max-w-500 grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <div className="overflow-y-auto">
        <main className="mx-auto h-full px-2">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
