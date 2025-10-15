// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// tasks endpoints
export const getTasks = (params) => API.get('/tasks', { params }).then(r => r.data);
export const createTask = (task) => API.post('/tasks', task).then(r => r.data);
export const updateTask = (id, updates) => API.put(`/tasks/${id}`, updates).then(r => r.data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`).then(r => r.data);
