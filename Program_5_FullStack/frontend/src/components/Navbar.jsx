import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div style={{
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-offwhite)',
        fontSize: '0.68rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        padding: '8px 16px',
        textAlign: 'center',
        fontWeight: 500
      }}>
        FULL STACK INTEGRATION (REACT + EXPRESS + MONGOOSE) • VERCEL & RENDER READY
      </div>

      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(247, 246, 242, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: 'var(--border-subtle)'
      }}>
        <div className="container" style={{
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '24px', flex: 1, alignItems: 'center' }}>
            <Link to="/" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Editorial
            </Link>
            <Link to="/shop" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Collection
            </Link>
            {isAdmin && (
              <Link to="/admin" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                ★ Admin Atelier
              </Link>
            )}
          </nav>

          {/* Brand Logo */}
          <div style={{ textAlign: 'center' }}>
            <Link to="/">
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1
              }}>
                CLOSETÉ
              </span>
              <span style={{
                display: 'block',
                fontSize: '0.55rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--color-charcoal)',
                marginTop: '4px'
              }}>
                STYLE IS PERSONAL. MAKE IT YOURS.
              </span>
            </Link>
          </div>

          {/* User & Cart Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', flex: 1 }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                  {user.name.split(' ')[0]} {isAdmin && '(Admin)'}
                </span>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  style={{ fontSize: '0.7rem', color: '#777', textDecoration: 'underline' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <Link to="/login">Sign In</Link>
                <span>/</span>
                <Link to="/register">Register</Link>
              </div>
            )}

            <button
              onClick={() => setIsDrawerOpen(true)}
              style={{ position: 'relative', padding: '6px' }}
              aria-label="Open Shopping Bag"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-4px',
                  backgroundColor: 'var(--color-black)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '0.62rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600
                }}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
