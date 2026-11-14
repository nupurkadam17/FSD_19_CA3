/**
 * CLOSETÉ - Program 1 Filtering & Sorting Engine
 * Academic concepts: Pure array manipulation, multi-criteria filtering, sorting.
 */
const FilterEngine = {
  applyFilters(products, criteria = {}) {
    if (!Array.isArray(products)) return [];

    const {
      searchQuery = '',
      category = 'All',
      size = 'All',
      maxPrice = Infinity,
      sortBy = 'featured'
    } = criteria;

    const query = searchQuery.trim().toLowerCase();

    // 1. Filtering phase
    let results = products.filter(p => {
      if (query && !p.name?.toLowerCase().includes(query) && !p.description?.toLowerCase().includes(query)) {
        return false;
      }
      if (category !== 'All' && p.category !== category) return false;
      if (size !== 'All' && (!p.sizes || !p.sizes.includes(size))) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    // 2. Sorting phase
    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    }

    return results;
  }
};
