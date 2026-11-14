import React from 'react';
import { formatPrice } from '../../data/sampleProducts';

const CATEGORIES = ['All', 'Dresses', 'Tops', 'Shirts', 'Trousers', 'Co-ord Sets', 'Outerwear', 'Accessories'];
const SIZES = ['All', 'XS', 'S', 'M', 'L', 'XL'];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) {
  return (
    <div style={{
      backgroundColor: 'var(--color-white)',
      border: 'var(--border-subtle)',
      padding: '24px',
      marginBottom: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Top Row: Search and Sort */}
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search silhouettes, fabrics, colors..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 42px',
              fontSize: '0.85rem',
              border: '1px solid var(--color-softgrey)',
              backgroundColor: 'var(--color-offwhite)'
            }}
          />
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Sort:
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            style={{
              padding: '8px 24px 8px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: '1px solid var(--color-softgrey)',
              backgroundColor: 'var(--color-offwhite)'
            }}
          >
            <option value="featured">Featured / Curated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px', color: '#666' }}>
          Category
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onFilterChange('category', cat)}
              style={{
                padding: '6px 14px',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: filters.category === cat ? 'var(--color-black)' : 'var(--color-offwhite)',
                color: filters.category === cat ? 'white' : 'var(--color-black)',
                border: '1px solid var(--color-softgrey)',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Row: Size, Price Slider & Reset */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap',
        paddingTop: '16px',
        borderTop: '1px solid var(--color-lightgrey)'
      }}>
        {/* Sizes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Size:
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {SIZES.map(sz => (
              <button
                key={sz}
                onClick={() => onFilterChange('size', sz)}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  backgroundColor: filters.size === sz ? 'var(--color-black)' : 'white',
                  color: filters.size === sz ? 'white' : 'var(--color-black)',
                  border: '1px solid var(--color-softgrey)'
                }}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Max Price:
          </span>
          <input
            type="range"
            min="2000"
            max="15000"
            step="500"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
            style={{ accentColor: 'var(--color-black)', cursor: 'pointer', width: '130px' }}
          />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, minWidth: '70px' }}>
            {formatPrice(filters.maxPrice)}
          </span>
        </div>

        {/* Results indicator & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>
            Showing {totalResults} pieces
          </span>
          <button
            onClick={onResetFilters}
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              color: '#444'
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
