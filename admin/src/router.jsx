import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout";
import HomePage from "./pages/home.page";
import OrdersPage from "./pages/orders.page";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
