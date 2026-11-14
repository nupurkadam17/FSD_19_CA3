/**
 * CLOSETÉ - Program 1 DOM Manipulation Module
 * Demonstrates dynamic element creation, event binding, and DOM updates.
 */
const DOM = {
  // Dynamic Product Grid Rendering
  renderProductGrid(products, onAddToCart) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (!products || products.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 40px;">No matching pieces found.</p>';
      return;
    }

    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      const imgUrl = (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';

      card.innerHTML = `
        <div class="product-card-img-wrap">
          <img class="product-card-img" src="${imgUrl}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-card-body">
          <div>
            <div class="product-card-cat">${p.category}</div>
            <h3 class="product-card-name">${p.name}</h3>
          </div>
          <div>
            <div class="product-card-price">₹${Number(p.price).toLocaleString('en-IN')}</div>
            <button class="btn-primary btn-add-bag" style="width: 100%;">Add to Wardrobe</button>
          </div>
        </div>
      `;

      card.querySelector('.btn-add-bag').addEventListener('click', () => {
        if (typeof onAddToCart === 'function') onAddToCart(p);
      });

      grid.appendChild(card);
    });
  },

  // Dynamic Cart Drawer Rendering
  renderCart(cartItems, onRemoveItem) {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const countEl = document.getElementById('cartCount');
    if (!container) return;

    container.innerHTML = '';
    let total = 0;
    let count = 0;

    cartItems.forEach(item => {
      total += item.price * (item.quantity || 1);
      count += (item.quantity || 1);

      const div = document.createElement('div');
      div.className = 'cart-item';
      const imgUrl = (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80';

      div.innerHTML = `
        <img src="${imgUrl}" alt="${item.name}">
        <div style="flex: 1;">
          <h4 style="font-size: 0.9rem; font-family: var(--font-serif);">${item.name}</h4>
          <p style="font-size: 0.8rem; color: #666;">₹${Number(item.price).toLocaleString('en-IN')} × ${item.quantity || 1}</p>
          <button class="btn-remove" style="background:none; border:none; color:#D32F2F; font-size:0.72rem; cursor:pointer; margin-top:4px;">Remove</button>
        </div>
      `;

      div.querySelector('.btn-remove').addEventListener('click', () => {
        if (typeof onRemoveItem === 'function') onRemoveItem(item.id);
      });

      container.appendChild(div);
    });

    if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    if (countEl) countEl.textContent = count;
  },

  // Toast Notifications
  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }
};
