import api from './api';

// POST /api/auth/login -> data: { token, student }
export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data;
};

// POST /api/auth/register -> data: { token, student }
export const register = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data.data;
};

// Persist the session using the agreed storage keys
export const saveSession = ({ token, student }) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('authStudent', JSON.stringify(student));
};

export const clearSession = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authStudent');
};
