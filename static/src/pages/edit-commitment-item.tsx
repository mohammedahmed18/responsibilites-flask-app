import { useParams } from 'react-router-dom'
import useAsync from '../hooks/use-async'
import { api } from '../api/api'
import { AxiosResponse } from "axios"
import CommitmentForm from '../components/CommitmentItemForm'
const EditCommitmentItemPage = () => {
  const params = useParams()
  const commitmentId = params.id || ""
  const { value, loading } = useAsync(() => {
    return api.get("/res-item/" + commitmentId)
  }, [commitmentId])
  const { value: usersRes } = useAsync(() => {
    return api.get("/users")
  }, [])
  const allUsers = usersRes ? ((usersRes as AxiosResponse).data) : []
  const commitmentItem = value ? (value as AxiosResponse)?.data : null
  return (
    <div>
      {loading && <span>Loading....</span>}
      {commitmentItem && <CommitmentForm
        initialData={{
          ...commitmentItem,
          users: commitmentItem.users.map((u:any) => u.id.toString())
        }}
      parentCommitmentId={commitmentItem.responsibility_id}
      allUsers={allUsers}
      />}
    </div>
  )
}
export default EditCommitmentItemPage
