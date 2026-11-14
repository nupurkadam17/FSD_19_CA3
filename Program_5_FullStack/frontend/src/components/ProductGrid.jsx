import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 24px', backgroundColor: 'var(--color-white)', border: 'var(--border-subtle)' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '8px' }}>
          No Pieces Found
        </h3>
        <p style={{ color: '#777', fontSize: '0.85rem' }}>
          No garments match the current criteria in our MongoDB catalog.
        </p>
      </div>
    );
  }

  return (
    <div className="grid-cols-4">
      {products.map(p => (
        <ProductCard key={p._id || p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
