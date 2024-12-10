import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import { CartProvider } from "./store/shopping-cart-context";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Root />,
    children: [
      { path: "orders", element: <Orders /> },
      { path: "products", element: <Products /> },
    ],
  },
  { path: "/", element: <Landing /> },
  { path: "cart", element: <Cart /> },
  { path: "/login", element: <Login type="login" /> },
  { path: "/register", element: <Login type="register" /> },
]);

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
