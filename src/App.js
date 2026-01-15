import React, { useState, useEffect } from "react";
function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };
  const toggleTask = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });
  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ textAlign: "center" }}>My To-Do App</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")} style={{ marginLeft: "5px" }}>
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ marginLeft: "5px" }}
        >
          Completed
        </button>
      </div>
      {filteredTasks.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
          No tasks available
        </p>
      ) : (
        <ul style={{ marginTop: "20px" }}>
          {filteredTasks.map((t, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              {t.text}
              <button
                onClick={() => toggleTask(index)}
                style={{ marginLeft: "10px" }}
              >
                {t.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => deleteTask(index)}
                style={{ marginLeft: "5px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
