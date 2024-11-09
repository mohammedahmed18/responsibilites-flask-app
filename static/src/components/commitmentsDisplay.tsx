import { RessData } from "./ressTable"

const CommitmentDisplay = ({ commitment }: {commitment: RessData}) => {
    return (
        <div>
            {commitment.items.map((item: any, idx: number) => (
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
                                        <td className="px-4 py-2">{i + 1}</td>
                                        <td className="px-4 py-2">{u.rotba}</td>
                                        <td className="px-4 py-2">{u.name}</td>
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

export default CommitmentDisplay