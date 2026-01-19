import { ChevronRightIcon, PenLine, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onEditTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    query.set("date", task.date);
    query.set("time", task.time);
    query.set("priority", task.priority);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.priority === "low" && "🟢"}
            {task.priority === "medium" && "🟡"}
            {task.priority === "high" && "🔴"}
            <span className="ml-1">{task.title}</span>
          </button>

          <Button onClick={() => onSeeDetailsClick(task)}>
            <ChevronRightIcon />
          </Button>

          <Button onClick={() => onDeleteTaskClick(task.id)}>
            <TrashIcon />
          </Button>

          <Button onClick={() => onEditTaskClick(task)}>
            <PenLine />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
