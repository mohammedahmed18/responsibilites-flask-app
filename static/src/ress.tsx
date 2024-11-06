import { Link } from "react-router-dom"
import { api } from "./api/api"
import CustomButton from "./components/CustomButton"
import RessTable from "./components/ressTable"
import useAsync from "./hooks/use-async"

const ResponsibilitesPage = () => {
  const { loading, value: responsibilitesRes } = useAsync(() => {
    return api.get("/res/all")
  }, [])
  const ress = responsibilitesRes ? responsibilitesRes?.data : []
  return (
    <div className="">
      {loading && <span>Loading.....</span>}
      <div className="container mx-auto my-5">
        <div className="mb-3">
          <Link to="/create-commitment">
            <CustomButton label="create today commitments" onClick={() => { }} />
          </Link>
        </div>
        <RessTable data={ress} />
      </div>
    </div>

  )
}


export default ResponsibilitesPage
