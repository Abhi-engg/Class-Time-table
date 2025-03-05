import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Timetable endpoints
export const timetableApi = {
  getAll: () => api.get('/timetable/'),
  getDaily: () => api.get('/timetable/daily/'),
  getWeekly: () => api.get('/timetable/weekly/'),
  getById: (id) => api.get(`/timetable/${id}/`),
  create: (data) => api.post('/timetable/', data),
  update: (id, data) => api.put(`/timetable/${id}/`, data),
  delete: (id) => api.delete(`/timetable/${id}/`),
};

export default api; 