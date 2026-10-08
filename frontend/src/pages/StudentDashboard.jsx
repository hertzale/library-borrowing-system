import { useEffect, useState } from 'react';
import BookSearch from '../components/student/BookSearch';
import AvailableBooks from '../components/student/AvailableBooks';
import BorrowButton from '../components/student/BorrowButton';
import MyBorrowedBooks from '../components/student/MyBorrowedBooks';
import { fetchBooks } from '../services/studentBookService';
import { fetchMyBorrowings } from '../services/studentBorrowService';
import { getErrorMessage } from '../services/api';

export default function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [search, setSearch] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingBorrowings, setLoadingBorrowings] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  // Load books (re-runs on search, filter, or after borrowing)
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoadingBooks(true);
      try {
        const result = await fetchBooks({ search, available: availableOnly });
        if (!cancelled) {
          setBooks(result.books);
          setError('');
        }
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to load books'));
      } finally {
        if (!cancelled) setLoadingBooks(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [search, availableOnly, reloadKey]);

  // Load the student's borrowed books (re-runs after borrowing)
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoadingBorrowings(true);
      try {
        const result = await fetchMyBorrowings();
        if (!cancelled) setBorrowings(result.borrowings);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to load your borrowed books'));
      } finally {
        if (!cancelled) setLoadingBorrowings(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

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
        <BookSearch onSearch={setSearch} loading={loadingBooks} />
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
          loading={loadingBooks}
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

      <div className="card">
        <h2>My Borrowed Books ({borrowings.length})</h2>
        <MyBorrowedBooks borrowings={borrowings} loading={loadingBorrowings} />
      </div>
    </div>
  );
}
