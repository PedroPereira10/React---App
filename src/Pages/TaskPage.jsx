import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const priority = searchParams.get("priority");

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="w-[500] mx-auto space-y-4">
        <div className="flex justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 mb-6 text-slate-100"
          >
            <ChevronLeft />
          </button>
          <Title>Details of the task</Title>
        </div>

        <div className="bg-slate-200 p-4 rounded-md">
          <h2 className="text-xl font-bold text-slate-600">{title}</h2>
          <p className="text-slate-600">{description}</p>
          <p className="text-slate-600">Date: {date}</p>
          <p className="text-slate-600">At: {time}</p>
          <p className="text-slate-600">Priority: {priority}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
