import { useState } from 'react';
import { borrowBook } from '../../services/studentBorrowService';
import { getErrorMessage } from '../../services/api';

export default function BorrowButton({ bookId, disabled, onBorrowed, onError }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const borrowing = await borrowBook(bookId);
      if (onBorrowed) onBorrowed(borrowing);
    } catch (err) {
      if (onError) onError(getErrorMessage(err, 'Failed to borrow the book'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleClick} disabled={disabled || loading}>
      {loading ? 'Borrowing...' : disabled ? 'Unavailable' : 'Borrow'}
    </button>
  );
}
