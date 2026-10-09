import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './Admin.css';

export default function Login() {
  useDocumentTitle('Admin Login');
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Wrong email or password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="admin-login">
      <form className="admin-card" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}