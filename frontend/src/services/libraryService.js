import api from './api';

// GET /api/books?search= → data: { count, books }
export const fetchBooks = async (search = '') => {
  const params = {};
  if (search) params.search = search;
  const { data } = await api.get('/books', { params });
  return data.data;
};