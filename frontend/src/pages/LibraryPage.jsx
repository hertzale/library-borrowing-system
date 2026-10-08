import { useEffect, useState } from 'react';
import BookTable from '../components/library/BookTable';
import LibrarySearch from '../components/library/LibrarySearch';
import { fetchBooks } from '../services/libraryService';
import { getErrorMessage } from '../services/api';

export default function LibraryPage() {
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
        const result = await fetchBooks(search);
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
      <h1 className="page-title">Library Catalog</h1>

      <div className="card">
        <LibrarySearch onSearch={setSearch} loading={loading} />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h2>
          {search ? `Results for "${search}"` : 'All books'} ({books.length})
        </h2>
        <BookTable books={books} loading={loading} />
      </div>
    </div>
  );
}