import { useEffect, useState } from "react";
import Input from "./input";

function AddTask({ onAddTaskSubmit, taskBeingEdited }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (taskBeingEdited) {
      setTitle(taskBeingEdited.title);
      setDescription(taskBeingEdited.description);
      setDate(taskBeingEdited.date);
      setTime(taskBeingEdited.time);
      setPriority(taskBeingEdited.priority);
    }
  }, [taskBeingEdited]);

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Write the title of your task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Write the description of your task"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium">📅 Select date :</span>
        <div className="flex-1">
          <Input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium">🕐 Select time :</span>
        <div className="flex-1">
          <Input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </div>
      </div>
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
      >
        <option value="">Select your priority :</option>
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>
      <button
        onClick={() => {
          if (
            !title.trim() ||
            !description.trim() ||
            !date.trim() ||
            !time.trim() ||
            !priority.trim()
          ) {
            return alert("Please fill in both fields.");
          }
          onAddTaskSubmit(title, description, date, time, priority);
          setTitle("");
          setDescription("");
          setDate("");
          setTime("");
          setPriority("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        {taskBeingEdited ? "Save changes" : "Add Task"}
      </button>
    </div>
  );
}

export default AddTask;
