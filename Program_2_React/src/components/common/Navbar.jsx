import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ cartCount, wishlistCount, onOpenCart }) {
  const location = useLocation();

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
        COMPLIMENTARY WORLDWIDE DELIVERY ON ORDERS OVER ₹10,000 • AUTUMN/WINTER '26
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
          {/* Left Navigation */}
          <nav style={{ display: 'flex', gap: '28px', flex: 1 }}>
            <Link 
              to="/" 
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderBottom: location.pathname === '/' ? '1px solid black' : 'none',
                paddingBottom: '2px'
              }}
            >
              Editorial
            </Link>
            <Link 
              to="/shop" 
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderBottom: location.pathname === '/shop' ? '1px solid black' : 'none',
                paddingBottom: '2px'
              }}
            >
              Collection
            </Link>
            <Link 
              to="/add-product" 
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                borderBottom: location.pathname === '/add-product' ? '1px solid var(--color-accent)' : 'none',
                paddingBottom: '2px'
              }}
            >
              + Add Garment
            </Link>
          </nav>

          {/* Center Brand Identity */}
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

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', flex: 1 }}>
            <Link to="/wishlist" style={{ position: 'relative', padding: '6px' }} title="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && (
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
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button 
              onClick={onOpenCart} 
              style={{ position: 'relative', padding: '6px' }}
              title="Shopping Bag"
              aria-label="Open Shopping Bag"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
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
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
