import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ResponsibilitesPage from "./ress"
import CreateAndEditCommitment from "./pages/create-edit-commitments"
import EditCommitmentItemPage from "./pages/edit-commitment-item"
import ShowCommitmentsPage from "./pages/show-commitments-page"


const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsibilitesPage />,
    //loader: rootLoader,
  },
  {
    path: "/create-commitments/:date",
    element: <CreateAndEditCommitment />,
  },
  {
    path: "/commitments/:date",
    element: <ShowCommitmentsPage />,
  },
  {
    path: "/edit-commitment-item/:id",
    element: <EditCommitmentItemPage />,
  },
])


export default function() {
  return (
    <RouterProvider router={router} />
  )
}

