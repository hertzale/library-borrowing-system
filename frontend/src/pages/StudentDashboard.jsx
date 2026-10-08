import { useEffect, useState } from 'react';
import BookSearch from '../components/student/BookSearch';
import { fetchBooks } from '../services/studentBookService';
import { getErrorMessage } from '../services/api';

export default function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await fetchBooks({ search });
        if (!cancelled) setBooks(result.books);
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
  }, [search]);

  return (
    <div>
      <h1 className="page-title">Student Dashboard</h1>

      <div className="card">
        <BookSearch onSearch={setSearch} loading={loading} />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h2>Search results ({books.length})</h2>
        {loading ? (
          <p className="muted">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="empty">No books found.</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                {book.title} &mdash; {book.author}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
