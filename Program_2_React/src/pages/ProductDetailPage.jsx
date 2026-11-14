import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatPrice } from '../data/sampleProducts';

export default function ProductDetailPage({
  products,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState(
    product && product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '16px' }}>
          Piece Not Found
        </h2>
        <p style={{ color: '#777', marginBottom: '24px' }}>
          The requested garment could not be located in our current catalog.
        </p>
        <Link to="/shop" className="btn-primary">Return to Collection</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="container" style={{ marginTop: '48px' }}>
      <div style={{ marginBottom: '24px', fontSize: '0.75rem', color: '#888' }}>
        <Link to="/">Home</Link> &gt; <Link to="/shop">Collection</Link> &gt; <span>{product.name}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '64px',
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-subtle)',
        padding: '48px'
      }}>
        {/* Product Image */}
        <div style={{ position: 'relative', aspectRatio: '3 / 4', backgroundColor: 'var(--color-lightgrey)' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {product.stock <= 5 && (
            <span style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: 'var(--color-danger)',
              color: 'white',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              fontWeight: 700
            }}>
              Only {product.stock} units remaining
            </span>
          )}
        </div>

        {/* Product Information */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#777', marginBottom: '6px' }}>
            {product.category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 500, marginBottom: '12px' }}>
            {product.name}
          </h1>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px' }}>
            {formatPrice(product.price)}
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)', lineHeight: '1.8', marginBottom: '32px' }}>
            {product.description}
          </p>

          {/* Size Selector */}
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
                    border: '1px solid var(--color-softgrey)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Variants */}
          <div style={{ marginBottom: '36px', fontSize: '0.8rem', color: '#666' }}>
            <strong>Available In:</strong> {Array.isArray(product.colors) ? product.colors.join(', ') : 'Classic Noir'}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => onAddToCart(product, selectedSize)}
              className="btn-primary"
              style={{ flex: 1, padding: '16px' }}
            >
              Add to Bag · {formatPrice(product.price)}
            </button>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
              }}
              title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
