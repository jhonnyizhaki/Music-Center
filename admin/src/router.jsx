import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout";
import HomePage from "./pages/home.page";
import OrdersPage from "./pages/orders.page";
import UsersPage from "./pages/users.page";
import LoginPage from "./pages/login.page";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
