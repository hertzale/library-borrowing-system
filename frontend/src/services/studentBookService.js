import api from './api';

// GET /api/books?search=&available= -> data: { count, books }
export const fetchBooks = async ({ search = '', available = false } = {}) => {
  const params = {};
  if (search) params.search = search;
  if (available) params.available = 'true';
  const { data } = await api.get('/books', { params });
  return data.data;
};
