import { useEffect, useState } from 'react';
import BookSearch from '../components/student/BookSearch';
import AvailableBooks from '../components/student/AvailableBooks';
import BorrowButton from '../components/student/BorrowButton';
import { fetchBooks } from '../services/studentBookService';
import { getErrorMessage } from '../services/api';

export default function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchBooks({ search, available: availableOnly });
        if (!cancelled) {
          setBooks(result.books);
          setError('');
        }
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to load books'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [search, availableOnly, reloadKey]);

  const handleBorrowed = (borrowing) => {
    const due = new Date(borrowing.dueDate).toLocaleDateString();
    setSuccess(`You borrowed "${borrowing.book.title}". Please return it by ${due}.`);
    setError('');
    setReloadKey((key) => key + 1);
  };

  const handleBorrowError = (message) => {
    setError(message);
    setSuccess('');
    setReloadKey((key) => key + 1);
  };

  return (
    <div>
      <h1 className="page-title">Student Dashboard</h1>

      <div className="card">
        <BookSearch onSearch={setSearch} loading={loading} />
        <label className="row" style={{ marginTop: 12, fontSize: 14 }}>
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          Show available books only
        </label>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h2>Books ({books.length})</h2>
        <AvailableBooks
          books={books}
          loading={loading}
          renderAction={(book) => (
            <BorrowButton
              bookId={book._id}
              disabled={book.availableCopies < 1}
              onBorrowed={handleBorrowed}
              onError={handleBorrowError}
            />
          )}
        />
      </div>
    </div>
  );
}
