import { useEffect, useState } from 'react';
import BookSearch from '../components/student/BookSearch';
import AvailableBooks from '../components/student/AvailableBooks';
import { fetchBooks } from '../services/studentBookService';
import { getErrorMessage } from '../services/api';

export default function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await fetchBooks({ search, available: availableOnly });
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
  }, [search, availableOnly]);

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

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h2>Books ({books.length})</h2>
        <AvailableBooks books={books} loading={loading} />
      </div>
    </div>
  );
}
