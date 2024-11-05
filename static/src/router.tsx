import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import OrdersPage from "./orders"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //loader: rootLoader,
  },
  {
    path: "orders",
    element: <OrdersPage />,
  },
])


export default function() {
  return (
    <RouterProvider router={router} />
  )
}

