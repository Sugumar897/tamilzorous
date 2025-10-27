import React, { useEffect, useState } from "react";
import "./admin.css";

function Admin() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Assigned");
  const [priority, setPriority] = useState("Medium");


  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

 
  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  
  const handleCreateTask = async () => {
    if (!title || !assignedTo) return alert("Title and Assigned To are required");

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, assigned_to: assignedTo, status, priority }),
    });

    fetchTasks();
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setStatus("Assigned");
    setPriority("Medium");
  };

 
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };


  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()) ||
      task.assigned_to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <h2>Create Task</h2>
      <div className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
  <option value="">Assign to (employee)</option>
  {employees.map((emp) => (
    <option key={emp.id} value={emp.email}>
      {emp.name} ({emp.email})
    </option>
  ))}
</select>

<select value={status} onChange={(e) => setStatus(e.target.value)}>
  <option value="Assigned">Assigned</option>
  <option value="Started">Started</option>
  <option value="Hold">Hold</option>
  <option value="Completed">Completed</option>
</select>

<select value={priority} onChange={(e) => setPriority(e.target.value)}>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
  <option value="Urgent">Urgent</option>
</select>


        <button onClick={handleCreateTask}>Create Task</button>
      </div>


      <input
        type="text"
        className="search-bar"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.assigned_to}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
