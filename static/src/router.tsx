import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ResponsibilitesPage from "./ress"
import CreateAndEditCommitment from "./pages/create-edit-commitments"


const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsibilitesPage />,
    //loader: rootLoader,
  },
  {
    path: "/create-commitment",
    element: <CreateAndEditCommitment />,
  },
])


export default function() {
  return (
    <RouterProvider router={router} />
  )
}

