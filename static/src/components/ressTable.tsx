import dayjs from "dayjs";
import CustomButton from "./CustomButton"
import { Link } from "react-router-dom";

export type RessData = {
  date: string,
  id: number,
  items: RessItem[]
}

export type RessItem = {
  id: number,
  details: string,
  notes?: string,
  type: "CONFERENCE" | "LETTER",
  users: { id: number, name: string, rotba: string }[]
}

const RessTable = ({ data }: { data: RessData[] }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">التاريخ</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">النوع</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">التفاصيل</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">الملاحظات</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">الأفراد المعينين</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          event.items.map((item) => {
            const formattedDate = dayjs(event.date).format("YYYY-MM-DD")
            return (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4 text-sm text-gray-600">
                  <Link to={`/commitments/${formattedDate}`} className="underline hover:text-blue-600">
                    {formattedDate}
                  </Link>
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">{item.type}</td>
                <td className="py-2 px-4 text-sm text-gray-600">{item.details}</td>
                <td className="py-2 px-4 text-sm text-gray-600">{item.notes}</td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {item.users.map((u => (
                    <span className="block">{u.rotba + "\/" + u.name}</span>
                  )))}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  <Link to={`/edit-commitment-item/${item.id}`}>
                    <CustomButton label="edit" onClick={() => { }} />
                  </Link>
                </td>
              </tr>
            )
          })
        ))}
      </tbody>
    </table>
  );
};

export default RessTable
