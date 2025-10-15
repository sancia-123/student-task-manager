import React, { useEffect, useState } from 'react';

// Define initial empty form values
const initial = {
  title: '',
  description: '',
  dueDate: '',
  status: 'Pending'
};

export default function TaskForm({ onAdd, editing, onUpdate, onCancel }) {
  const [form, setForm] = useState(initial);

  // When editing changes, populate form with existing task data
  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        description: editing.description || '',
        // Convert stored ISO date (e.g. 2025-10-20T00:00:00Z) to yyyy-mm-dd for date input
        dueDate: editing.dueDate
          ? new Date(editing.dueDate).toISOString().slice(0, 10)
          : '',
        status: editing.status || 'Pending'
      });
    } else {
      setForm(initial);
    }
  }, [editing]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert('Title is required');
      return;
    }

    // Clone and format payload
    const payload = { ...form };
    if (payload.dueDate) {
      payload.dueDate = new Date(payload.dueDate).toISOString(); // store in ISO format
    }

    if (editing) {
      onUpdate(editing._id, payload);
    } else {
      onAdd(payload);
      setForm(initial);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: '1px solid #ddd',
        padding: 12,
        borderRadius: 6,
        marginBottom: 20,
        backgroundColor: '#fafafa'
      }}
    >
      <h2 style={{ marginBottom: 10 }}>
        {editing ? 'Edit Task' : 'Add Task'}
      </h2>

      {/* Title Input */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ width: '100%', padding: 6 }}
          required
        />
      </div>

      {/* Description Input */}
      <div style={{ marginBottom: 8 }}>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ width: '100%', padding: 6, minHeight: 60 }}
        />
      </div>

      {/* Due Date Input */}
      <div style={{ marginBottom: 8 }}>
        <label>
          Due Date:{' '}
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </label>
      </div>

      {/* Status Dropdown */}
      <div style={{ marginBottom: 8 }}>
        <label>
          Status:{' '}
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 10 }}>
        <button type="submit">{editing ? 'Save' : 'Add'}</button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            style={{ marginLeft: 8, backgroundColor: '#eee' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
