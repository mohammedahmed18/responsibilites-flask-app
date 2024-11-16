import dayjs from "dayjs"
import { useParams } from "react-router-dom"
import useAsync from "../hooks/use-async"
import { api } from "../api/api"
import { AxiosResponse } from "axios"
import CommitmentDisplay from "../components/commitmentsDisplay"
import ProptectedRoute from "../protectedRoute"

const ShowCommitmentsPage = () => {
  const { date } = useParams()
  const { loading, value } = useAsync(() => {
    return api.get("/res/" + dayjs(date).format("YYYY-MM-DD"))
  }, [])

  const parentCommitment = value ? (value as AxiosResponse).data : null
  return (
    <ProptectedRoute>
      <div className="container mx-auto py-7">
        {loading && <span>Loading...</span>}
        {
          parentCommitment && (
            <div>
              <h2 className="text-center font-bold text-3xl">{dayjs(parentCommitment.date).format("YYYY-MM-DD")}</h2>
              <CommitmentDisplay commitment={parentCommitment} />
            </div>
          )
        }
      </div>
    </ProptectedRoute>
  )
}

export default ShowCommitmentsPage
