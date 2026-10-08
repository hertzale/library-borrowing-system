import { useEffect, useState } from 'react';
import BookSearch from '../components/student/BookSearch';
import BookList from '../components/student/BookList';
import MyBorrowedBooks from '../components/student/MyBorrowedBooks';
import { request } from '../services/api';

export default function StudentHome({ student }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  async function loadBooks(search = '') {
    setLoading(true);
    setError('');
    try {
      const path = search ? `/books?search=${encodeURIComponent(search)}` : '/books';
      const json = await request(path);
      setBooks(json.data.books);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  function handleBorrowed() {
    setRefreshKey((k) => k + 1);
    loadBooks();
  }

  return (
    <div>
      <h2>Welcome, {student?.name}</h2>
      <BookSearch onSearch={loadBooks} />
      <BookList books={books} loading={loading} error={error} onBorrowed={handleBorrowed} />
      <MyBorrowedBooks refreshKey={refreshKey} />
    </div>
  );
}
