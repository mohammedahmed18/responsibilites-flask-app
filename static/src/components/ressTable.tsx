import dayjs from "dayjs";
import CustomButton from "./CustomButton"
import { Link } from "react-router-dom";
import { getLocalizedType } from "../ress";
import { useAuth } from "../protectedRoute/authContext";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import { hasAccess } from "../utils/roles";

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


  
const RessTable = ({ data, mode }: { data: RessData[] , mode?: "display" | "manage"}) => {
  const { user } = useAuth()
  const isEditor = hasAccess(user, "EDITOR")
  let textClassName = mode == "manage" ? "text-sm text-gray-600" : "text-md text-gray-900"

function truncate(max: number, str?: string) {
  if (mode == "display") return str || ""
  if (!str) return ""
  return str.length > max ? str.substring(0, max - 1) + '…' : str;
}
  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg table">
      <thead className="bg-gray-100">
        <tr>
          {mode == "manage" && <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">التاريخ</th>}
          {mode == "display" && <th></th>}
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">النوع</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">التفاصيل</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">الملاحظات</th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">الأفراد المعنيين</th>
          {isEditor && mode == "manage" && <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700"></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          event.items.map((item,idx) => {
            const formattedDate = dayjs(event.date).format("YYYY-MM-DD")
            return (
              <tr key={event.id + "." + item.id} className="border-t">
                {mode == "display" && <td className={"py-2 px-4 " + textClassName }>{idx+1}</td>}

                {mode == "manage" && <td className={"py-2 px-4 " + textClassName }>
                  <Link to={`/commitments/${formattedDate}`} className="underline hover:text-blue-600">
                    {dayjs(event.date).format("dddd YYYY-MM-DD").replaceEnglishDays()}
                  </Link>
                </td>}
                <td className={"py-2 px-4 " + textClassName }>{getLocalizedType(item.type)}</td>
                <td className={"py-2 px-4 " + textClassName }>
                  {/* {truncate(200, item.details,)} */}
                  <ReactQuill
                    value={truncate(100, item.details)}
                    readOnly={true}
                    theme={"bubble"}
                  />
                </td>

                <td className={"py-2 px-4 " + textClassName }>
                  <ReactQuill
                    value={truncate(100, item.notes)}
                    readOnly={true}
                    theme={"bubble"}
                  />
                </td>
                <td className={"py-2 px-4 text-sm text-gray-600 !w-fit whitespace-nowrap"}>
                  <div className="flex flex-col">
                  {item.users.map((u => (
                    <span key={u.id} className={"block whitespace-pre-wrap " + mode == "display" ? "text-indigo-700" : ""}>{u.rotba + "\/ " + u.name}</span>
                  )))}
                  </div>
                </td>
                {isEditor && mode == "manage" && <td className={"py-2 px-4 " + textClassName }>
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
