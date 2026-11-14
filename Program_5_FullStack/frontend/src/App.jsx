import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminProductsPage from './pages/AdminProductsPage';
import CheckoutPage from './pages/CheckoutPage';

const formatINR = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

function CartDrawerModal() {
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQty, removeFromCart, subtotal } = useCart();
  if (!isDrawerOpen) return null;

  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 490;
  const total = subtotal + shipping;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.45)',
      backdropFilter: 'blur(4px)',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        height: '100vh',
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.15)'
      }}>
        <div style={{ padding: '24px', borderBottom: 'var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
            Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h3>
          <button onClick={() => setIsDrawerOpen(false)} style={{ fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '8px' }}>Your Bag is Empty</p>
              <p style={{ color: '#777', fontSize: '0.85rem' }}>Discover tailored pieces in our catalog.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map(item => (
                <div key={item.cartItemId} style={{ display: 'flex', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid var(--color-lightgrey)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '105px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>{item.name}</h4>
                        <button onClick={() => removeFromCart(item.cartItemId)} style={{ fontSize: '0.75rem', color: '#999', textDecoration: 'underline' }}>
                          Remove
                        </button>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#777', marginTop: '2px' }}>Size: {item.selectedSize}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>{formatINR(item.price)}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', border: '1px solid var(--color-softgrey)' }}>
                        <button onClick={() => updateQty(item.cartItemId, -1)} style={{ width: '28px', height: '28px' }}>−</button>
                        <span style={{ width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.cartItemId, 1)} style={{ width: '28px', height: '28px' }}>+</button>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{formatINR(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '24px', borderTop: 'var(--border-subtle)', backgroundColor: 'var(--color-offwhite)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span>Delivery</span>
              <span>{shipping === 0 ? 'Complimentary' : formatINR(shipping)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-softgrey)', fontWeight: 700, fontSize: '1.05rem' }}>
              <span>Total (incl. GST)</span>
              <span>{formatINR(total)}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsDrawerOpen(false)} className="btn-primary" style={{ width: '100%', marginTop: '16px', textAlign: 'center' }}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminProductsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawerModal />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
