import api from './api';

// POST /api/borrowings/borrow -> data: { borrowing }
export const borrowBook = async (bookId) => {
  const { data } = await api.post('/borrowings/borrow', { bookId });
  return data.data.borrowing;
};
