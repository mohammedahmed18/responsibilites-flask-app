import { api } from "../api/api"
import { AxiosResponse } from "axios"
import CommitmentForm from "../components/CommitmentItemForm"
import useAsync from "../hooks/use-async"
import dayjs from "dayjs"
import { RessItem } from "../components/ressTable"
import CustomButton from "../components/CustomButton"
import { useState } from "react"

const CreateAndEditCommitment = () => {
  const [creatingCommitment, setCreatingCommitment] = useState(false)
  const { loading, value } = useAsync(() => {
    return api.get("/res/today")
  }, [])
  const { value: usersRes } = useAsync(() => {
    return api.get("/users")
  }, [])
  const todayCommitment = value ? (value as AxiosResponse).data : null
  return (
    <div className="container mx-auto py-5">
      {loading ? "Loading..." : (
        <>
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{dayjs(todayCommitment.date).format("YYYY-MM-DD")}</h2>
          </div>

          {todayCommitment.items.map((i: RessItem, idx: number) => (
            <div key={i.id} className="mb-5">
              <span>{idx + 1}</span>
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
            <span>{todayCommitment.items.length + 1}</span>
            <CommitmentForm
              parentCommitmentId={todayCommitment.id}
              allUsers={usersRes ? ((usersRes as AxiosResponse).data) : []}
              initialData={{
                type: "letter",
                notes: "",
                details: "",
                users: []
              }}
            />
          </>

          }
          <div className="my-4">
            <CustomButton label="add a new commitment" onClick={() => setCreatingCommitment(true)} color="green" disabled={creatingCommitment} />
          </div>
        </>
      )
      }
    </div >
  )
}

export default CreateAndEditCommitment
