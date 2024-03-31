import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/orders", element: <Orders /> },
      { path: "/products", element: <Products /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
