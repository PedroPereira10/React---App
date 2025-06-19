import { useState } from "react";
import Input from "./input";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("");

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
      <Input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <Input
        type="time"
        value={time}
        onChange={(event) => setTime(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Set the priority of your task (low, medium, high)"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      />
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
        Add
      </button>
    </div>
  );
}

export default AddTask;
