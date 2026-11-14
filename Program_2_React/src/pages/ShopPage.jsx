import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';

export default function ShopPage({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart
}) {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [filters, setFilters] = useState({
    searchQuery: '',
    category: initialCategory,
    size: 'All',
    maxPrice: 15000,
    sortBy: 'featured'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      size: 'All',
      maxPrice: 15000,
      sortBy: 'featured'
    });
  };

  // Pure memoized filter calculation
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesDesc = p.description?.toLowerCase().includes(q);
        const matchesCat = p.category?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      // 2. Category
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      // 3. Size
      if (filters.size !== 'All' && (!p.sizes || !p.sizes.includes(filters.size))) return false;
      // 4. Price
      if (p.price > filters.maxPrice) return false;
      return true;
    });

    // Sort
    const sorted = [...result];
    switch (filters.sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'featured':
      default:
        return sorted.sort((a, b) => ((b.isTrending ? 2 : 0) + (b.isNew ? 1 : 0)) - ((a.isTrending ? 2 : 0) + (a.isNew ? 1 : 0)));
    }
  }, [products, filters]);

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: 700 }}>
          Curated Wardrobe
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '4px' }}>
          {filters.category === 'All' ? 'All Garments' : filters.category}
        </h1>
      </div>

      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      <ProductGrid
        products={filteredProducts}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
