import dayjs from "dayjs";
import CustomButton from "./CustomButton"
import { Link } from "react-router-dom";
import { getLocalizedType } from "../ress";
import { useAuth } from "../protectedRoute/authContext";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';

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

function truncate(max: number, str?: string) {
  if (!str) return ""
  return str.length > max ? str.substring(0, max - 1) + '…' : str;
}

const RessTable = ({ data }: { data: RessData[] }) => {
  const { user: { role } } = useAuth()
  const isEditor = role == "EDITOR"
  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">التاريخ</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">النوع</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">التفاصيل</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">الملاحظات</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">الأفراد المعنيين</th>
          {isEditor && <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700"></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          event.items.map((item) => {
            const formattedDate = dayjs(event.date).format("YYYY-MM-DD")
            return (
              <tr key={event.id + "." + item.id} className="border-t">
                <td className="py-2 px-4 text-sm text-gray-600">
                  <Link to={`/commitments/${formattedDate}`} className="underline hover:text-blue-600">
                    {formattedDate}
                  </Link>
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">{getLocalizedType(item.type)}</td>
                <td className="py-2 px-4 text-sm text-gray-600">
                {/* {truncate(200, item.details,)} */}
                <ReactQuill
                            value={item.details}
                            readOnly={true}
                            theme={"bubble"}
                        />
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">{truncate(200, item.notes)}</td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {item.users.map((u => (
                    <span key={u.id} className="block">{u.rotba + "\/" + u.name}</span>
                  )))}
                </td>
                {isEditor && <td className="py-2 px-4 text-sm text-gray-600">
                  <Link to={`/edit-commitment-item/${item.id}`}>
                    <CustomButton label="تعديل" onClick={() => { }} />
                  </Link>
                </td>}
              </tr>
            )
          })
        ))}
      </tbody>
    </table>
  );
};

export default RessTable
