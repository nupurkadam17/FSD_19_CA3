import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/shop');
    } else {
      setError(res.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '440px', marginTop: '60px' }}>
      <div style={{ backgroundColor: 'var(--color-white)', border: 'var(--border-subtle)', padding: '40px' }}>
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#777', fontWeight: 700 }}>
          Create Profile
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: '4px 0 20px' }}>
          Register
        </h2>

        {error && (
          <div style={{ backgroundColor: '#FFF5F5', color: 'var(--color-danger)', padding: '10px 14px', fontSize: '0.8rem', marginBottom: '16px', border: '1px solid var(--color-danger)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Deepika Padukone"
              required
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.85rem', border: '1px solid var(--color-softgrey)', backgroundColor: 'var(--color-offwhite)' }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              required
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.85rem', border: '1px solid var(--color-softgrey)', backgroundColor: 'var(--color-offwhite)' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
              Password (min 6 characters)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.85rem', border: '1px solid var(--color-softgrey)', backgroundColor: 'var(--color-offwhite)' }}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.75rem', color: '#777', textAlign: 'center' }}>
          Already registered? <Link to="/login" style={{ textDecoration: 'underline', color: 'black' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
