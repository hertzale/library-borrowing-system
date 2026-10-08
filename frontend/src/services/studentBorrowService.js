import api from './api';

// POST /api/borrowings/borrow -> data: { borrowing }
export const borrowBook = async (bookId) => {
  const { data } = await api.post('/borrowings/borrow', { bookId });
  return data.data.borrowing;
};

// GET /api/borrowings/my -> data: { count, borrowings }
export const fetchMyBorrowings = async () => {
  const { data } = await api.get('/borrowings/my');
  return data.data;
};
