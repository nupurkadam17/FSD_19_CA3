import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';

export default function HomePage({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart
}) {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Editorial Hero Banner */}
      <section className="container" style={{ margin: '32px auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          backgroundColor: 'var(--color-white)',
          border: 'var(--border-subtle)',
          minHeight: '620px'
        }}>
          <div style={{ padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666', fontWeight: 700, marginBottom: '16px' }}>
                Collection N° 05 · Autumn/Winter
              </p>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                fontWeight: 400,
                marginBottom: '24px'
              }}>
                ARCHITECTURAL <em>TAILORING</em>
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--color-charcoal)', lineHeight: '1.7', maxWidth: '440px', marginBottom: '32px' }}>
                Sculptural silhouettes meticulously crafted from Italian double-faced wool, Mulberry silk, and Japanese gabardine.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/shop" className="btn-primary">Explore Collection</Link>
              <Link to="/shop?category=Dresses" className="btn-secondary">View Dresses</Link>
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
              alt="Editorial Lookbook"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              backgroundColor: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              padding: '12px 20px',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderLeft: '2px solid black'
            }}>
              Editorial Campaign N° 05
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container" style={{ marginTop: '80px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
          borderBottom: 'var(--border-subtle)',
          paddingBottom: '16px'
        }}>
          <div>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: 700 }}>
              Recent Additions
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginTop: '4px' }}>
              New Season Arrivals
            </h2>
          </div>
          <Link to="/shop" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'underline' }}>
            View All ({products.length})
          </Link>
        </div>

        <ProductGrid
          products={newArrivals}
          wishlistIds={wishlistIds}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
        />
      </section>
    </div>
  );
}
