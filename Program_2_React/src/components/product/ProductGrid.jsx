import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onResetFilters
}) {
  if (!products || products.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '64px 24px',
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-subtle)',
        marginTop: '24px'
      }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '8px' }}>
          No Pieces Found
        </h3>
        <p style={{ color: '#777', fontSize: '0.85rem', marginBottom: '24px' }}>
          We could not find any garments matching your exact filter criteria.
        </p>
        {onResetFilters && (
          <button onClick={onResetFilters} className="btn-primary">
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid-cols-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlistIds.has(product.id)}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
