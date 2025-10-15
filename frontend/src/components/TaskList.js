// src/components/TaskList.js
import React from 'react';

export default function TaskList({ tasks = [], onEdit, onDelete, onToggleStatus }) {
  if (!tasks.length) {
    return (
      <p style={{ textAlign: 'center', padding: 12, color: '#555' }}>
        No tasks found.
      </p>
    );
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
      <thead>
        <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>Title</th>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>Description</th>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>Due</th>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>Status</th>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t, index) => (
          <tr
            key={t._id}
            style={{
              backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
            }}
          >
            <td style={{ border: '1px solid #ccc', padding: 8 }}>{t.title}</td>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>
              {t.description ? t.description.slice(0, 60) : '-'}
            </td>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>
              {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}
            </td>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>{t.status}</td>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>
              <button onClick={() => onEdit(t)}>Edit</button>
              <button
                onClick={() => onDelete(t._id)}
                style={{ marginLeft: 6 }}
              >
                Delete
              </button>
              <button
                onClick={() => onToggleStatus(t)}
                style={{ marginLeft: 6 }}
              >
                {t.status === 'Completed'
                  ? 'Mark Pending'
                  : t.status === 'In Progress'
                  ? 'Mark Completed'
                  : 'Start Task'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
