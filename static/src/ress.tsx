import { Link } from "react-router-dom";
import { api } from "./api/api";
import CustomButton from "./components/CustomButton";
import RessTable from "./components/ressTable";
import useAsync from "./hooks/use-async";
import dayjs from "dayjs";
import { AxiosResponse } from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommitmentDisplay from "./components/commitmentsDisplay";
import ProptectedRoute from "./protectedRoute";
import { useAuth } from "./protectedRoute/authContext";

export const getLocalizedType = (type: string) => {
  const typeNonCase = type.toLowerCase()
  if (typeNonCase == "letter") return "جواب"
  else if (typeNonCase == "conference") return "مؤتمر"
  return ""
}
const ResponsibilitesPage = () => {
  const [date, setDate] = useState<string>();
  const { user } = useAuth()
  const { loading, value: responsibilitesRes } = useAsync(() => {
    return api.get(`/res/all?date=${date || ""}`);
  }, [date]);

  const { value: todayCommitmentResponse } = useAsync(() => {
    return api.get(`/res/${dayjs().format("YYYY-MM-DD")}`);
  }, []);

  const ress = responsibilitesRes ? (responsibilitesRes as AxiosResponse).data : [];

  // Function to handle the date change
  const handleDateChange = (date: Date | null) => {
    setDate(dayjs(date).format("YYYY-MM-DD"));
  };

  const handleClearDate = () => {
    setDate(undefined);
  };

  const todayCommitment = todayCommitmentResponse ? (todayCommitmentResponse as AxiosResponse).data : null

  return (
    <ProptectedRoute>
      <div className="container mx-auto py-5 px-4">
        {loading && <span>Loading...</span>}
        <div className="my-6 p-5 shadow-lg border rounded-lg">
          <h2 className="text-center font-bold text-2xl">إلتزامات اليوم</h2>
          {todayCommitment && <CommitmentDisplay commitment={todayCommitment} />}
        </div>
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <label htmlFor="datePicker" className="text-lg mx-4 font-semibold text-gray-700">اختر التاريخ : </label>
            <DatePicker
              selected={date ? dayjs(date).toDate() : null}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClearDate}
              className="p-2 ml-3 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              مسح
            </button>
          </div>
          {user.role == "EDITOR" &&
            <Link to={"/manage-commitments/" + (date || dayjs().add(1, "day").format("YYYY-MM-DD"))}>
              <CustomButton label={`إلتزامات ${date ? date : "الغد"}`} onClick={() => { }} />
            </Link>}
        </div>

        <RessTable data={ress} />
      </div>
    </ProptectedRoute>
  );
};

export default ResponsibilitesPage
