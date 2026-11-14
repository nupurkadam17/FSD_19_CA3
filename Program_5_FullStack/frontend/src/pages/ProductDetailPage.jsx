import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../api/client';
import { useCart } from '../context/CartContext';

const formatINR = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('S');
  const { addToCart } = useCart();

  useEffect(() => {
    client.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data.data);
        if (res.data.data.sizes && res.data.data.sizes.length > 0) {
          setSelectedSize(res.data.data.sizes[0]);
        }
      })
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>Loading garment details from backend...</div>;
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="btn-primary" style={{ marginTop: '16px' }}>Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '48px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '64px',
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-subtle)',
        padding: '48px'
      }}>
        <div style={{ position: 'relative', aspectRatio: '3 / 4', backgroundColor: 'var(--color-lightgrey)' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#777', marginBottom: '6px' }}>
            {product.category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 500, marginBottom: '12px' }}>
            {product.name}
          </h1>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px' }}>
            {formatINR(product.price)}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)', lineHeight: '1.8', marginBottom: '32px' }}>
            {product.description}
          </p>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>
              Select Size
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(product.sizes || ['Standard']).map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: selectedSize === sz ? 'var(--color-black)' : 'var(--color-offwhite)',
                    color: selectedSize === sz ? 'white' : 'var(--color-black)',
                    border: '1px solid var(--color-softgrey)'
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, selectedSize)}
            className="btn-primary"
            style={{ width: '100%', padding: '16px' }}
          >
            Add to Bag · {formatINR(product.price)}
          </button>
        </div>
      </div>
    </div>
  );
}
