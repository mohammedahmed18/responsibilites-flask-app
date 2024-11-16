import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ResponsibilitesPage from "./ress"
import CreateAndEditCommitment from "./pages/create-edit-commitments"
import EditCommitmentItemPage from "./pages/edit-commitment-item"
import ShowCommitmentsPage from "./pages/show-commitments-page"
import LoginPage from "./pages/login"
import Layout from "./components/layout"
import ProfilePage from "./pages/profile"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><ResponsibilitesPage /></Layout>,
  },
  {
    path: "/profile",
    element: <Layout><ProfilePage /></Layout>
  },
  {
    path: "/login",
    element: <Layout><LoginPage /></Layout>,
  },
  {
    path: "/manage-commitments/:date",
    element: <Layout><CreateAndEditCommitment /></Layout>,
  },
  {
    path: "/commitments/:date",
    element: <Layout> <ShowCommitmentsPage /></Layout>,
  },
  {
    path: "/edit-commitment-item/:id",
    element: <Layout> <EditCommitmentItemPage /></Layout>,
  }
])


export default function () {
  return (
    <RouterProvider router={router} />
  )
}

