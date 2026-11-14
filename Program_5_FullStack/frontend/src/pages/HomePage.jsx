import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import ProductGrid from '../components/ProductGrid';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    client.get('/products')
      .then(res => setProducts(res.data.data.slice(0, 4)))
      .catch(err => console.error('Fetch error:', err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="container" style={{ margin: '32px auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          backgroundColor: 'var(--color-white)',
          border: 'var(--border-subtle)',
          minHeight: '600px'
        }}>
          <div style={{ padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666', fontWeight: 700, marginBottom: '16px' }}>
                Full Stack MERN Architecture · Autumn/Winter '26
              </p>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                fontWeight: 400,
                marginBottom: '24px'
              }}>
                CONTEMPORARY <em>ELEGANCE</em>
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--color-charcoal)', lineHeight: '1.7', maxWidth: '440px', marginBottom: '32px' }}>
                Connected to persistent MongoDB cluster with Express backend API and reactive React client.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/shop" className="btn-primary">Browse Collection</Link>
              <Link to="/admin" className="btn-secondary">Admin Portal</Link>
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
              alt="Editorial Campaign"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

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
              Live from MongoDB Database
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginTop: '4px' }}>
              New Season Arrivals
            </h2>
          </div>
          <Link to="/shop" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'underline' }}>
            View All Pieces
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>Loading MongoDB collection...</div>
        ) : (
          <ProductGrid products={products} onAddToCart={addToCart} />
        )}
      </section>
    </div>
  );
}
