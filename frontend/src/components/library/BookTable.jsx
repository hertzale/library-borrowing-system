export default function BookTable({ books, loading, onSelect }) {
  if (loading) return <p className="muted">Loading books...</p>;
  if (!books || books.length === 0) return <p className="empty">No books found.</p>;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Copies (available / total)</th>
            <th>Status</th>
            {onSelect && <th>Details</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const available = book.availableCopies > 0;
            return (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>
                  {book.availableCopies} / {book.totalCopies}
                </td>
                <td>
                  <span className={`badge ${available ? 'badge-success' : 'badge-danger'}`}>
                    {available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                {onSelect && (
                  <td>
                    <button className="btn btn-secondary" onClick={() => onSelect(book)}>
                      View
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}