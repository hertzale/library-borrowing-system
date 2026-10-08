export default function AvailableBooks({ books, loading, renderAction }) {
  if (loading) return <p className="muted">Loading books...</p>;
  if (!books || books.length === 0) return <p className="empty">No books found.</p>;

  return (
    <div className="grid">
      {books.map((book) => {
        const available = book.availableCopies > 0;
        return (
          <div className="book-card" key={book._id}>
            <div>
              <h3 style={{ margin: '0 0 4px' }}>{book.title}</h3>
              <p className="muted" style={{ margin: '0 0 8px' }}>by {book.author}</p>
              <p style={{ margin: '0 0 8px', fontSize: 14 }}>
                {book.category} &middot; ISBN {book.isbn}
              </p>
              {book.description && (
                <p className="muted" style={{ margin: '0 0 12px', fontSize: 13 }}>{book.description}</p>
              )}
            </div>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className={`badge ${available ? 'badge-success' : 'badge-danger'}`}>
                {available ? `${book.availableCopies} of ${book.totalCopies} available` : 'Unavailable'}
              </span>
              {renderAction && renderAction(book)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
