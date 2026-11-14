import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import CartDrawer from './components/cart/CartDrawer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import { initialProducts } from './data/sampleProducts';

export default function App() {
  // 1. Products Master State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('closete_react_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // 2. Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('closete_react_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Wishlist State
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('closete_react_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // 4. UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // Sync to localStorage via useEffect
  useEffect(() => {
    localStorage.setItem('closete_react_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('closete_react_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('closete_react_wishlist', JSON.stringify([...wishlistIds]));
  }, [wishlistIds]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Add Product Handler (Demonstrates State Lifting from ProductForm)
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" added to collection!`, 'success');
  };

  // Cart Handlers
  const handleAddToCart = (product, selectedSize = 'Standard') => {
    const cartItemId = `${product.id}-${selectedSize}`;
    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        cartItemId,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        selectedSize,
        quantity: 1
      }];
    });
    showToast(`Added "${product.name}" (${selectedSize}) to Bag`);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleRemoveCartItem = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from shopping bag');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handler
  const handleToggleWishlist = (productId) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast('Removed piece from Wishlist');
      } else {
        next.add(productId);
        showToast('Saved piece to Wishlist');
      }
      return next;
    });
  };

  const cartTotalCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar
          cartCount={cartTotalCount}
          wishlistCount={wishlistIds.size}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/shop"
              element={
                <ShopPage
                  products={products}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  products={products}
                  isWishlisted={(id) => wishlistIds.has(id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/add-product"
              element={<AddProductPage onAddProduct={handleAddProduct} />}
            />
            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  products={products}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cartItems={cart}
                  onClearCart={handleClearCart}
                  onShowToast={showToast}
                />
              }
            />
          </Routes>
        </main>

        <Footer />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveCartItem}
        />

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />
      </div>
    </BrowserRouter>
  );
}
