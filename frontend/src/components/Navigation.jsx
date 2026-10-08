import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  useLocation(); // re-render on every route change so the nav reflects login state

  const token = localStorage.getItem('authToken');
  let student = null;
  try {
    student = JSON.parse(localStorage.getItem('authStudent'));
  } catch {
    student = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authStudent');
    navigate('/login', { replace: true });
  };

  return (
    <nav className="nav">
      <Link className="nav-brand" to="/">&#128218; Library System</Link>
      <div className="nav-links">
        {token ? (
          <>
            <NavLink className="nav-link" to="/student">Student</NavLink>
            <NavLink className="nav-link" to="/library">Library</NavLink>
            {student?.name && <span style={{ color: '#9ca3af', fontSize: 14 }}>{student.name}</span>}
            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink className="nav-link" to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}
