import React from 'react';
import { Link } from 'react-router-dom';

const formatINR = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

export default function ProductCard({ product, onAddToCart }) {
  const id = product._id || product.id;

  return (
    <article style={{
      backgroundColor: 'var(--color-white)',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', backgroundColor: 'var(--color-lightgrey)' }}>
        <Link to={`/product/${id}`}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </Link>
        {product.stock <= 5 && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'var(--color-danger)',
            color: 'white',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '4px 8px',
            fontWeight: 600
          }}>
            Only {product.stock} Left
          </span>
        )}
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#767676', marginBottom: '4px' }}>
          {product.category}
        </span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '6px' }}>
          <Link to={`/product/${id}`}>{product.name}</Link>
        </h3>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--color-lightgrey)' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{formatINR(product.price)}</span>
          <span style={{ fontSize: '0.72rem', color: '#888' }}>
            {Array.isArray(product.sizes) ? product.sizes.join(' · ') : ''}
          </span>
        </div>
        <button
          onClick={() => onAddToCart(product, product.sizes ? product.sizes[0] : 'Standard')}
          style={{
            marginTop: '12px',
            width: '100%',
            backgroundColor: 'var(--color-offwhite)',
            color: 'var(--color-black)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '10px',
            border: '1px solid var(--color-softgrey)'
          }}
        >
          + Add to Bag
        </button>
      </div>
    </article>
  );
}
