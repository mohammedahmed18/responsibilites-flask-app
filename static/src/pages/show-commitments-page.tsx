import dayjs from "dayjs"
import { useParams } from "react-router-dom"
import useAsync from "../hooks/use-async"
import { api } from "../api/api"
import { AxiosResponse } from "axios"
import Layout from "../components/layout"

const ShowCommitmentsPage = () => {
  const { date } = useParams()
  const { loading, value } = useAsync(() => {
    return api.get("/res/" + dayjs(date).format("YYYY-MM-DD"))
  }, [])

  const parentCommitment = value ? (value as AxiosResponse).data : null
  return (
    <Layout>
      <div className="container mx-auto py-7">
        {loading && <span>Loading...</span>}
        {
          parentCommitment && (
            <div>
              <h2 className="text-center font-bold text-3xl">{dayjs(parentCommitment.date).format("YYYY-MM-DD")}</h2>
              {parentCommitment.items.map((item: any, idx: number) => (
                <div key={item.id}>
                  <p className="text-lg">{idx + 1}- {item.details}</p>
                  <span className="text-gray-600">{item.notes}</span>

                  <table className="bg-white border border-gray-300 rounded-lg shadow-lg my-4">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700"></th>
                        <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Rotba</th>
                        <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.users.map((u: any, i: number) => {
                        return (
                          <tr key={u.id} className="border-t">
                            <td className="px-4">{i + 1}</td>
                            <td className="px-4">{u.rotba}</td>
                            <td className="px-4">{u.name}</td>
                          </tr>
                        )
                      })
                      }
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default ShowCommitmentsPage
