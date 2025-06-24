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
        size="large"
        style={{
          backgroundColor: "#fff",
          borderColor: "#d9d9d9",
        }}
      />
      <Input
        type="time"
        value={time}
        onChange={(event) => setTime(event.target.value)}
        size="large"
        style={{
          backgroundColor: "#fff",
          borderColor: "#d9d9d9",
        }}
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        style={{
          backgroundColor: "white",
          border: "2px solid #d9d9d9",
          borderRadius: "6px",
          padding: "8px 12px",
          fontSize: "16px",
          color: "#333",
          width: "100%",
          minHeight: "40px",
        }}
      >
        <option value="">Select your priority:</option>
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
        Add
      </button>
    </div>
  );
}

export default AddTask;
