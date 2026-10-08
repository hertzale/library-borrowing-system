import { useState } from 'react';
import { request } from '../../services/api';

export default function BorrowButton({ bookId, disabled, onBorrowed }) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleBorrow() {
    setBusy(true);
    setMessage('');
    try {
      await request('/borrow', { method: 'POST', body: { bookId }, auth: true });
      setMessage('Borrowed!');
      onBorrowed?.();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <span>
      <button onClick={handleBorrow} disabled={disabled || busy}>
        {busy ? 'Borrowing...' : 'Borrow'}
      </button>
      {message && <small> {message}</small>}
    </span>
  );
}
