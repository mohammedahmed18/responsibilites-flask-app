type RessData = {
  date: string,
  id: number,
  items: RessItem[]
}

type RessItem = {
  id: number,
  details: string,
  notes?: string,
  type: "conference" | "letter",
  users: { id: number, name: string, rotba: string }[]
}

const RessTable = ({ data }: { data: RessData[] }) => {
  return (
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Details</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Notes</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Assigned Users</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event) => (
            event.items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4 text-sm text-gray-600">{event.date}</td>
                <td className="py-2 px-4 text-sm text-gray-600">{item.type}</td>
                <td className="py-2 px-4 text-sm text-gray-600">{item.details}</td>
                <td className="py-2 px-4 text-sm text-gray-600">{item.notes}</td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {item.users.map((u => (
                    <span className="block">{u.rotba + "\/" + u.name}</span>
                  )))}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
  );
};

export default RessTable
