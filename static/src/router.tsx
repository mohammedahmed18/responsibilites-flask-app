import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ResponsibilitesPage from "./ress"


const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsibilitesPage />,
    //loader: rootLoader,
  },
])


export default function() {
  return (
    <RouterProvider router={router} />
  )
}

