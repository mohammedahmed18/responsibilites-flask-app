import { api } from "../api/api"
import CommitmentForm from "../components/CommitmentItemForm"
import useAsync from "../hooks/use-async"

const CreateAndEditCommitment = () => {
  const { loading, value } = useAsync(() => {
    return api.get("/res/today")
  }, [])
  return (
    <div>
      {/* Parent Commitment Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{parentCommitmentTitle}</h2>
      </div>
      <CommitmentForm parentCommitmentTitle="21-11-2024" onSubmit={() => { }}
        initialData={{
          type: "letter",
          notes: "",
          details: "",
          users: []
        }} />
    </div>
  )
}

export default CreateAndEditCommitment
