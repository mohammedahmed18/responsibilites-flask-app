import { api } from "../api/api"
import { AxiosResponse } from "axios"
import CommitmentForm from "../components/CommitmentItemForm"
import useAsync from "../hooks/use-async"
import dayjs from "dayjs"
import { RessItem } from "../components/ressTable"
import CustomButton from "../components/CustomButton"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Layout from "../components/layout"

const CommitmentCounter = ({ num }: { num: number }) => {
  return (
    <span className="font-bold block text-center bg-indigo-600 text-white rounded-2xl mx-auto w-fit px-10">{num}</span>
  )
}
const CreateAndEditCommitment = () => {
  const [creatingCommitment, setCreatingCommitment] = useState(false)
  const { date } = useParams()
  const { loading, value } = useAsync(() => {
    return api.get("/res/" + dayjs(date).format("YYYY-MM-DD"))
  }, [])
  const { value: usersRes } = useAsync(() => {
    return api.get("/users")
  }, [])
  const todayCommitment = value ? (value as AxiosResponse).data : null
  return (
    <Layout>
      <div className="container mx-auto py-5 px-4">
        {loading ? "Loading..." : (
          <>
            <div className="border-b pb-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{dayjs(todayCommitment.date).format("YYYY-MM-DD")}</h2>
            </div>

            {todayCommitment?.items?.map((i: RessItem, idx: number) => (
              <div key={i.id} className="mb-5">
                <CommitmentCounter num={idx + 1} />
                <CommitmentForm
                  parentCommitmentId={todayCommitment.id}
                  allUsers={usersRes ? ((usersRes as AxiosResponse).data) : []}
                  initialData={{
                    id: i.id,
                    type: i.type,
                    notes: i.notes,
                    details: i.details,
                    users: i.users.map(i => i.id.toString())
                  }}
                />
              </div>
            ))}
            {creatingCommitment && <>
              <CommitmentCounter num={todayCommitment.items.length + 1} />
              <CommitmentForm
                parentCommitmentId={todayCommitment.id}
                allUsers={usersRes ? ((usersRes as AxiosResponse).data) : []}
                initialData={{
                  type: "LETTER",
                  notes: "",
                  details: "",
                  users: []
                }}
              />
            </>

            }
            <div className="my-4 mx-auto w-fit">
              <CustomButton label="إضافة إلتزام جديد" onClick={() => setCreatingCommitment(true)} color="green" disabled={creatingCommitment} />
            </div>
          </>
        )
        }
      </div>
    </Layout>
  )
}

export default CreateAndEditCommitment
