// src/App.js
import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import TaskForm from './components/TaskForm';
import ChartStatus from './components/ChartStatus';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({ status: '', q: '' });

  // Load tasks from API
  const load = useCallback(async () => {
    const params = {};
    if (filter.status) params.status = filter.status;
    if (filter.q) params.q = filter.q;

    const data = await getTasks(params);
    setTasks(data);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (task) => {
    await createTask(task);
    load();
  };

  const handleUpdate = async (id, updates) => {
    await updateTask(id, updates);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(id);
    load();
  };

  // ✅ Toggle task status between Pending, In Progress, Completed
  const toggleStatus = async (task) => {
    let newStatus;
    if (task.status === 'Pending') newStatus = 'In Progress';
    else if (task.status === 'In Progress') newStatus = 'Completed';
    else newStatus = 'Pending';

    const updatedTask = { ...task, status: newStatus };
    try {
      await updateTask(task._id, updatedTask);
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Filter tasks by status and search query (title + description)
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = !filter.status || task.status === filter.status;

    const query = filter.q.trim().toLowerCase();
    const searchMatch =
      !query ||
      (task.title && task.title.toLowerCase().includes(query)) ||
      (task.description && task.description.toLowerCase().includes(query));

    return statusMatch && searchMatch;
  });

  // ✅ Helper to format due date as dd-mm-yyyy
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d)) return '-'; // handle invalid dates safely
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 10 }}>
      <h1>Student Task Manager</h1>

      {/* Task Form */}
      <TaskForm
        onAdd={handleAdd}
        editing={editing}
        onUpdate={handleUpdate}
        onCancel={() => setEditing(null)}
      />

      {/* Filter and Search */}
      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <label>
          Filter status:{' '}
          <select
            value={filter.status}
            onChange={(e) =>
              setFilter((s) => ({ ...s, status: e.target.value }))
            }
          >
            <option value="">All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>

        <label>
          Search:{' '}
          <input
            value={filter.q}
            onChange={(e) => setFilter((s) => ({ ...s, q: e.target.value }))}
            placeholder="Search tasks..."
          />
        </label>

        <button
          onClick={() => setFilter({ status: '', q: '' })}
          style={{ marginLeft: 8 }}
        >
          Clear
        </button>
      </div>

      {/* Chart */}
      <div style={{ marginBottom: 30 }}>
        <ChartStatus tasks={filteredTasks} />
      </div>

      {/* Task Table */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Title</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Description</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Due Date</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Status</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: 'center', padding: 16, border: '1px solid #ccc' }}
                >
                  No tasks found.
                </td>
              </tr>
            )}
            {filteredTasks.map((task, index) => (
              <tr
                key={task._id}
                style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa' }}
              >
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{task.title}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{task.description}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>
                  {formatDate(task.dueDate)}
                </td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{task.status}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>
                  <button onClick={() => setEditing(task)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(task._id)}>Delete</button>{' '}
                  <button onClick={() => toggleStatus(task)}>
                    {task.status === 'Completed'
                      ? 'Mark Pending'
                      : task.status === 'In Progress'
                      ? 'Mark Completed'
                      : 'Start Task'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
