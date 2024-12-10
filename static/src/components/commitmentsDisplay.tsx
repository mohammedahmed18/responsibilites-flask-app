import RessTable, { RessData } from "./ressTable"
import 'react-quill/dist/quill.bubble.css';

const CommitmentDisplay = ({ commitment }: { commitment: RessData }) => {
    return (
        <div className="my-7 border p-3 rounded-lg">
            {!commitment.items.length && <p className="text-center py-8 text-3xl">لم يتم إضافة الإلتزامات بعد</p>}
            {/* {commitment.items.map((item: any, idx: number) => {return (
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
                    <hr className="my-4" />
                </div>
            )})} */}
            <RessTable mode="display" data={[commitment]}/>
        </div>
    )
}

export default CommitmentDisplay