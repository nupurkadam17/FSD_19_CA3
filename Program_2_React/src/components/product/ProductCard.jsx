import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../data/sampleProducts';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) {
  return (
    <article style={{
      backgroundColor: 'var(--color-white)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      border: '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      {/* Image Container with Badges & Wishlist Button */}
      <div style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        overflow: 'hidden',
        backgroundColor: 'var(--color-lightgrey)'
      }}>
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.6s ease'
            }}
            loading="lazy"
          />
        </Link>

        {/* Dynamic Tags */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.stock <= 5 && (
            <span style={{
              backgroundColor: 'var(--color-danger)',
              color: 'white',
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '4px 8px',
              fontWeight: 600
            }}>
              Only {product.stock} left
            </span>
          )}
          {product.isNew && (
            <span style={{
              backgroundColor: 'var(--color-black)',
              color: 'white',
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '4px 8px',
              fontWeight: 600
            }}>
              New Season
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: isWishlisted ? 'var(--color-black)' : 'rgba(255, 255, 255, 0.9)',
            color: isWishlisted ? 'white' : 'var(--color-black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Card Info */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{
          fontSize: '0.68rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#767676',
          marginBottom: '4px'
        }}>
          {product.category}
        </span>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          fontWeight: 500,
          marginBottom: '6px',
          lineHeight: 1.3
        }}>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid var(--color-lightgrey)'
        }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
            {formatPrice(product.price)}
          </span>
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
            border: '1px solid var(--color-softgrey)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-black)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-offwhite)';
            e.currentTarget.style.color = 'var(--color-black)';
          }}
        >
          + Add to Bag
        </button>
      </div>
    </article>
  );
}
