import ReactQuill from "react-quill"
import { RessData } from "./ressTable"
import 'react-quill/dist/quill.bubble.css';

const CommitmentDisplay = ({ commitment }: { commitment: RessData }) => {
    return (
        <div className="my-7 border p-3 rounded-lg">
            {!commitment.items.length && <p className="text-center py-8 text-3xl">لم يتم إضافة الإلتزامات بعد</p>}
            {commitment.items.map((item: any, idx: number) => {return (
                <div key={item.id}>
                    <div className="text-xl flex gap-2">
                        <span className="flex-shrink-0">{(idx + 1).toString().toArDigits() + " "}-</span>
                        <ReactQuill
                            value={item.details}
                            readOnly={true}
                            theme={"bubble"}
                        />
                    </div>
                    {<p className="text-md">
                        <ReactQuill
                            value={item.notes}
                            readOnly={true}
                            theme={"bubble"}
                        />
                    </p>}
                    <div className="flex item-center gap-4">
                        <span className="font-bold">الأفراد المعنيين</span>
                        {item.users.map((u: any) => {
                            return <span className="text-indigo-700" key={u.id}>{u.rotba + "\/" + u.name}</span>
                        })}
                    </div>
                    {/* <table className="bg-white border border-gray-300 rounded-lg shadow-lg my-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700"></th>
                                <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">الدرجة</th>
                                <th className="py-2 px-4 text-right text-sm font-semibold text-gray-700">الإسم</th>
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
                    </table> */}
                    <hr className="my-4" />
                </div>
            )})}
        </div>
    )
}

export default CommitmentDisplay