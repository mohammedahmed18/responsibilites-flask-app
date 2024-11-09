import { Link } from "react-router-dom"
import { api } from "./api/api"
import CustomButton from "./components/CustomButton"
import RessTable from "./components/ressTable"
import useAsync from "./hooks/use-async"
import dayjs from "dayjs"

const ResponsibilitesPage = () => {
  const { loading, value: responsibilitesRes } = useAsync(() => {
    return api.get("/res/all")
  }, [])
  const ress = responsibilitesRes ? responsibilitesRes?.data : []
  return (
    <div className="container mx-auto py-5 px-4">
      {loading && <span>Loading.....</span>}
      <div className="mb-3">
        <Link to={"/create-commitments/" + dayjs().add(1, "day").format("YYYY-MM-DD")}>
          <CustomButton label="create tomorrow commitments" onClick={() => { }} />
        </Link>
      </div>
      <RessTable data={ress} />
    </div>

  )
}


export default ResponsibilitesPage
