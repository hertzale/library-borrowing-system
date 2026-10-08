import { useEffect, useState } from 'react';
import { request } from '../../services/api';

export default function MyBorrowedBooks({ refreshKey }) {
  const [borrowings, setBorrowings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    request('/borrow/me', { auth: true })
      .then((json) => setBorrowings(json.data.borrowings))
      .catch((err) => setError(err.message));
  }, [refreshKey]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!borrowings.length) return <p>You have no borrowed books.</p>;

  return (
    <div>
      <h3>My Borrowed Books</h3>
      <ul>
        {borrowings.map((b) => (
          <li key={b._id}>
            {b.book?.title} (due {new Date(b.dueDate).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
