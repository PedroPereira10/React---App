function Filter({ selectedPriority, OnPriorityChange }) {
  const priorities = [
    { value: "", label: "All" },
    { value: "low", label: "🟢 Low" },
    { value: "medium", label: "🟡 Medium" },
    { value: "high", label: "🔴 High" },
  ];

  return (
    <div className="flex items-center gap-4 bg-slate-200 p-4 rounded-md shadow justify-center">
      <span className="text-gray-700 font-medium">📋 Filter by priority :</span>
      <select
        value={selectedPriority}
        onChange={(event) => OnPriorityChange(event.target.value)}
        className="border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
      >
        {priorities.map((priority) => (
          <option key={priority.value} value={priority.value}>
            {priority.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
