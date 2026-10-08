import { useState } from 'react';

export default function LibrarySearch({ onSearch, loading }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term.trim());
  };

  const handleClear = () => {
    setTerm('');
    onSearch('');
  };

  return (
    <form className="toolbar" onSubmit={handleSubmit}>
      <input
        className="input"
        style={{ flex: 1, minWidth: 220 }}
        type="text"
        placeholder="Search catalog by title, author, ISBN or category..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>Search</button>
      <button className="btn btn-secondary" type="button" onClick={handleClear} disabled={loading}>Clear</button>
    </form>
  );
}