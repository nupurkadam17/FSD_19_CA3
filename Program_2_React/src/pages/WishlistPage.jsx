import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';

export default function WishlistPage({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart
}) {
  const wishlistedProducts = products.filter(p => wishlistIds.has(p.id));

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div style={{ marginBottom: '32px', borderBottom: 'var(--border-subtle)', paddingBottom: '16px' }}>
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: 700 }}>
          Personal Wardrobe
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '4px' }}>
          Saved Pieces ({wishlistedProducts.length})
        </h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          backgroundColor: 'var(--color-white)',
          border: 'var(--border-subtle)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>
            Your Wishlist is Empty
          </h3>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '24px' }}>
            Save your favorite contemporary silhouettes while browsing our collections.
          </p>
          <Link to="/shop" className="btn-primary">Browse Collection</Link>
        </div>
      ) : (
        <ProductGrid
          products={wishlistedProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
