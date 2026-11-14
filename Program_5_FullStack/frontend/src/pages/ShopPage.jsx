import React, { useState, useEffect } from 'react';
import client from '../api/client';
import ProductGrid from '../components/ProductGrid';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['All', 'Dresses', 'Tops', 'Shirts', 'Trousers', 'Co-ord Sets', 'Outerwear', 'Accessories'];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    let url = `/products?sort=${sort}`;
    if (category !== 'All') url += `&category=${encodeURIComponent(category)}`;
    if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`;

    client.get(url)
      .then(res => setProducts(res.data.data))
      .catch(err => console.error('Fetch error:', err.message))
      .finally(() => setLoading(false));
  }, [category, search, sort]);

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: 700 }}>
          MERN Integrated Store
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '4px' }}>
          {category === 'All' ? 'Complete Wardrobe' : category}
        </h1>
      </div>

      {/* Filter Control Bar */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-subtle)',
        padding: '24px',
        marginBottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search silhouettes, fabrics from MongoDB..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: '240px',
              padding: '10px 16px',
              fontSize: '0.85rem',
              border: '1px solid var(--color-softgrey)',
              backgroundColor: 'var(--color-offwhite)'
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Sort:
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: '8px 16px',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: '1px solid var(--color-softgrey)',
                backgroundColor: 'var(--color-offwhite)'
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '6px 14px',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: category === cat ? 'var(--color-black)' : 'var(--color-offwhite)',
                color: category === cat ? 'white' : 'var(--color-black)',
                border: '1px solid var(--color-softgrey)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>Querying MongoDB database...</div>
      ) : (
        <ProductGrid products={products} onAddToCart={addToCart} />
      )}
    </div>
  );
}
