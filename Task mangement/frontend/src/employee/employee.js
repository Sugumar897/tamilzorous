import React, { useEffect, useState } from "react";
import "./employee.css";

function Employee() {
  const [tasks, setTasks] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const email = localStorage.getItem("email"); 


  const fetchTasks = async () => {
    if (!email) return;
    const res = await fetch(`http://localhost:5000/api/tasks?assigned_to=${email}`);
    const data = await res.json();
    setTasks(data);

    const map = {};
    data.forEach((task) => {
      map[task.id] = task.status;
    });
    setStatusMap(map);
  };

 
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          assigned_to: email, 
        }),
      });

      setStatusMap({ ...statusMap, [taskId]: newStatus });
      fetchTasks(); 
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Employee Dashboard</h1>

      <h2>Your Tasks</h2>

      <input
        type="text"
        placeholder="Search tasks..."
        className="search-bar"
        onChange={(e) => {
          const search = e.target.value.toLowerCase();
          setTasks((prev) =>
            prev.filter(
              (task) =>
                task.title.toLowerCase().includes(search) ||
                task.description.toLowerCase().includes(search)
            )
          );
        }}
      />

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <select
                  value={statusMap[task.id] || task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="Assigned">Assigned</option>
                  <option value="Started">Started</option>
                  <option value="Hold">Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
