const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '\u2014');

export default function MyBorrowedBooks({ borrowings, loading }) {
  if (loading) return <p className="muted">Loading your borrowed books...</p>;
  if (!borrowings || borrowings.length === 0) {
    return <p className="empty">You have not borrowed any books yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Borrowed</th>
            <th>Due</th>
            <th>Returned</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {borrowings.map((item) => {
            const overdue = item.status === 'borrowed' && new Date(item.dueDate) < new Date();
            let badgeClass = 'badge-warning';
            let label = 'Borrowed';
            if (item.status === 'returned') {
              badgeClass = 'badge-success';
              label = 'Returned';
            } else if (overdue) {
              badgeClass = 'badge-danger';
              label = 'Overdue';
            }
            return (
              <tr key={item._id}>
                <td>{item.book?.title || 'Unknown book'}</td>
                <td>{item.book?.author || '\u2014'}</td>
                <td>{formatDate(item.borrowDate)}</td>
                <td>{formatDate(item.dueDate)}</td>
                <td>{formatDate(item.returnDate)}</td>
                <td>
                  <span className={`badge ${badgeClass}`}>{label}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
