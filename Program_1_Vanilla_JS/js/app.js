/**
 * CLOSETÉ - Program 1 Master Application Controller
 * Orchestrates API data fetching, DOM interactions, event handling, cart state, and modal forms.
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Application State
  let allProducts = [];
  let cart = [];
  let currentFilters = {
    searchQuery: '',
    category: 'All',
    sortBy: 'featured'
  };

  // 1. Initial Data Fetch (Fetch API GET)
  try {
    allProducts = await API.fetchProducts();
    renderFiltered();
  } catch (err) {
    DOM.showToast('Failed to load products: ' + err.message);
  }

  // Filter & Render Helper
  function renderFiltered() {
    const filtered = FilterEngine.applyFilters(allProducts, currentFilters);
    DOM.renderProductGrid(filtered, addToCart);
  }

  // Cart Management
  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    DOM.renderCart(cart, removeFromCart);
    DOM.showToast(`Added "${product.name}" to your bag.`);
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    DOM.renderCart(cart, removeFromCart);
  }

  // 2. Event Listeners: Search, Filter, Sort
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.searchQuery = e.target.value;
      renderFiltered();
    });
  }

  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilters.category = chip.getAttribute('data-category');
      renderFiltered();
    });
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sortBy = e.target.value;
      renderFiltered();
    });
  }

  // 3. Cart Drawer Toggles
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const btnOpenCart = document.getElementById('btnOpenCart');
  const btnCloseCart = document.getElementById('btnCloseCart');

  function toggleCart(open) {
    if (cartDrawer) cartDrawer.classList.toggle('active', open);
    if (cartBackdrop) cartBackdrop.classList.toggle('active', open);
  }

  if (btnOpenCart) btnOpenCart.addEventListener('click', () => toggleCart(true));
  if (btnCloseCart) btnCloseCart.addEventListener('click', () => toggleCart(false));
  if (cartBackdrop) cartBackdrop.addEventListener('click', () => toggleCart(false));

  // 4. Modal Toggles: Add Product
  const addModal = document.getElementById('addProductModal');
  const btnOpenAdd = document.getElementById('btnOpenAddProduct');
  const btnCloseAdd = document.getElementById('btnCloseAddProduct');

  if (btnOpenAdd) btnOpenAdd.addEventListener('click', () => addModal.classList.add('active'));
  if (btnCloseAdd) btnCloseAdd.addEventListener('click', () => addModal.classList.remove('active'));

  // 5. Add Product Form Submission (Fetch API POST)
  const addForm = document.getElementById('addProductForm');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPiece = {
        name: document.getElementById('prodName').value.trim(),
        category: document.getElementById('prodCategory').value,
        price: Number(document.getElementById('prodPrice').value),
        description: document.getElementById('prodDesc').value.trim(),
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Noir', 'Ecru'],
        stock: 5,
        images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80']
      };

      const val = Validation.validateProductForm(newPiece);
      if (!val.isValid) {
        DOM.showToast(Object.values(val.errors)[0]);
        return;
      }

      try {
        const saved = await API.createProduct(newPiece);
        allProducts.unshift(saved);
        renderFiltered();
        addForm.reset();
        addModal.classList.remove('active');
        DOM.showToast(`Piece "${saved.name}" successfully posted to server!`);
      } catch (err) {
        DOM.showToast('POST Error: ' + err.message);
      }
    });
  }

  // 6. Checkout Modal & Order Finalization (Regex Validation Demo)
  const checkModal = document.getElementById('checkoutModal');
  const btnOpenCheck = document.getElementById('btnOpenCheckout');
  const btnCloseCheck = document.getElementById('btnCloseCheckout');
  const checkForm = document.getElementById('checkoutForm');

  if (btnOpenCheck) {
    btnOpenCheck.addEventListener('click', () => {
      if (cart.length === 0) {
        DOM.showToast('Your wardrobe bag is empty.');
        return;
      }
      toggleCart(false);
      checkModal.classList.add('active');
    });
  }
  if (btnCloseCheck) btnCloseCheck.addEventListener('click', () => checkModal.classList.remove('active'));

  if (checkForm) {
    checkForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const orderData = {
        fullName: document.getElementById('custName').value.trim(),
        email: document.getElementById('custEmail').value.trim(),
        phone: document.getElementById('custPhone').value.trim(),
        pincode: document.getElementById('custPin').value.trim(),
        paymentMethod: 'card',
        cardNumber: '4532015698741236'
      };

      const val = Validation.validateCheckout(orderData);
      if (!val.isValid) {
        DOM.showToast(Object.values(val.errors)[0]);
        return;
      }

      DOM.showToast(`Order confirmed for ${orderData.fullName}! Thank you.`);
      cart = [];
      DOM.renderCart(cart, removeFromCart);
      checkForm.reset();
      checkModal.classList.remove('active');
    });
  }
});
