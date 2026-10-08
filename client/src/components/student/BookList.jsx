import BorrowButton from './BorrowButton';

export default function BookList({ books, loading, error, onBorrowed }) {
  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!books.length) return <p>No books found.</p>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          <strong>{book.title}</strong> by {book.author} —{' '}
          {book.availableCopies > 0 ? 'Available' : 'Not available'}{' '}
          <BorrowButton
            bookId={book._id}
            disabled={book.availableCopies < 1}
            onBorrowed={onBorrowed}
          />
        </li>
      ))}
    </ul>
  );
}
