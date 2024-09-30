import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header.jsx";
import Loader from "./Loader.jsx";
import CartOverview from "../features/cart/CartOverview.jsx";

// Main layout component for the application
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
