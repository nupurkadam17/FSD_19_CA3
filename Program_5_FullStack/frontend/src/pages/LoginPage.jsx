import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@closete.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/shop');
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '440px', marginTop: '60px' }}>
      <div style={{ backgroundColor: 'var(--color-white)', border: 'var(--border-subtle)', padding: '40px' }}>
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#777', fontWeight: 700 }}>
          Client Atelier
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: '4px 0 20px' }}>
          Sign In
        </h2>

        {error && (
          <div style={{ backgroundColor: '#FFF5F5', color: 'var(--color-danger)', padding: '10px 14px', fontSize: '0.8rem', marginBottom: '16px', border: '1px solid var(--color-danger)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.85rem', border: '1px solid var(--color-softgrey)', backgroundColor: 'var(--color-offwhite)' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.85rem', border: '1px solid var(--color-softgrey)', backgroundColor: 'var(--color-offwhite)' }}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.75rem', color: '#777', textAlign: 'center' }}>
          New client? <Link to="/register" style={{ textDecoration: 'underline', color: 'black' }}>Create account</Link>
        </div>

        <div style={{ marginTop: '24px', padding: '12px', backgroundColor: 'var(--color-offwhite)', fontSize: '0.7rem', color: '#666', border: '1px dashed #ccc' }}>
          <strong>Demo Accounts:</strong><br />
          • Admin: <code>admin@closete.com</code> / <code>Admin@123</code><br />
          • Client: <code>client@closete.com</code> / <code>Client@123</code>
        </div>
      </div>
    </div>
  );
}
