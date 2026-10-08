import { useEffect, useState } from 'react';
import BookTable from '../components/library/BookTable';
import { fetchBooks } from '../services/libraryService';
import { getErrorMessage } from '../services/api';

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await fetchBooks();
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
  }, []);

  return (
    <div>
      <h1 className="page-title">Library Catalog</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h2>All books ({books.length})</h2>
        <BookTable books={books} loading={loading} />
      </div>
    </div>
  );
}