import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, saveSession } from '../../services/authService';
import { getErrorMessage } from '../../services/api';

export default function LoginForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isRegister = mode === 'register';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Email and password are required.');
      return;
    }
    if (isRegister && !form.name.trim()) {
      setError('Name is required.');
      return;
    }
    if (isRegister && form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const session = isRegister
        ? await register(form.name.trim(), form.email.trim(), form.password)
        : await login(form.email.trim(), form.password);
      saveSession(session);
      navigate('/student', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, 'Authentication failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h1 className="page-title" style={{ textAlign: 'center' }}>
        {isRegister ? 'Create Student Account' : 'Student Login'}
      </h1>

      <div className="row" style={{ justifyContent: 'center', marginBottom: 16 }}>
        <button
          type="button"
          className={`btn ${!isRegister ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => switchMode('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={`btn ${isRegister ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => switchMode('register')}
        >
          Register
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <div className="form-group">
            <label className="label" htmlFor="name">Full name</label>
            <input
              className="input"
              id="name"
              name="name"
              type="text"
              placeholder="Ana Cruz"
              value={form.name}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="form-group">
          <label className="label" htmlFor="email">Email</label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            placeholder="ana@school.edu"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">Password</label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Login'}
        </button>
      </form>
    </div>
  );
}
