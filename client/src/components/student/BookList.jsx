export default function BookList({ books, loading, error }) {
  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!books.length) return <p>No books found.</p>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          <strong>{book.title}</strong> by {book.author} —{' '}
          {book.availableCopies > 0 ? 'Available' : 'Not available'}
        </li>
      ))}
    </ul>
  );
}
