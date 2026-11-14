/**
 * CLOSETÉ - Program 1 API Module
 * Demonstrates HTTP GET and POST using Fetch API and async/await.
 */
const API = {
  baseUrl: '/api/products',

  // HTTP GET: Fetch product catalog
  async fetchProducts() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.warn('API fetch fallback to local products:', error.message);
      // Fallback for direct filesystem / file:// testing
      const localRes = await fetch('data/products.json');
      return await localRes.json();
    }
  },

  // HTTP POST: Create a new product record
  async createProduct(product) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit product');
    }
    return result.data || result;
  }
};
