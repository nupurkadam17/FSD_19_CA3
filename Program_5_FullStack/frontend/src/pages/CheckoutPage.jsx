import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [address, setAddress] = useState({ street: '', city: 'Mumbai', pincode: '400001' });
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '12px' }}>Authentication Required</h2>
        <p style={{ color: '#777', marginBottom: '20px' }}>Please sign in to place an order.</p>
        <Link to="/login" style={{ padding: '10px 24px', background: '#0A0A0A', color: '#FFF', textDecoration: 'none' }}>Sign In</Link>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div style={{ maxWidth: '540px', margin: '60px auto', padding: '36px', background: '#FFF', border: '1px solid #DDD', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '12px' }}>Order Confirmed</h2>
        <p style={{ color: '#666', marginBottom: '16px' }}>Order ID: <code>{orderSuccess._id || orderSuccess.id}</code></p>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '24px' }}>Thank you for your order. A confirmation has been recorded in the database.</p>
        <Link to="/shop" style={{ padding: '10px 20px', background: '#0A0A0A', color: '#FFF', textDecoration: 'none' }}>Continue Shopping</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return setErrorMsg('Your bag is empty.');
    setLoading(true);
    setErrorMsg(null);

    try {
      const orderPayload = {
        orderItems: cartItems.map(item => ({
          product: item.product._id || item.product.id,
          name: item.product.name,
          qty: item.quantity,
          price: item.product.price,
          size: item.size || 'M'
        })),
        shippingAddress: address,
        paymentMethod: 'Credit Card',
        totalPrice: totalAmount
      };

      const res = await client.post('/orders', orderPayload);
      setOrderSuccess(res.data.data);
      clearCart();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
      <div style={{ background: '#FFF', padding: '28px', border: '1px solid #DDD' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>Delivery Address</h2>
        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Enter dispatch coordinates.</p>
        {errorMsg && <div style={{ color: '#D32F2F', marginBottom: '12px' }}>{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>STREET ADDRESS</label>
            <input value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #CCC' }} placeholder="Flat / Building / Road" required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>CITY</label>
              <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #CCC' }} required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>PIN CODE</label>
              <input value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #CCC' }} required />
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#0A0A0A', color: '#FFF', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            {loading ? 'Processing...' : `Place Order (₹${totalAmount.toLocaleString('en-IN')})`}
          </button>
        </form>
      </div>

      <div style={{ background: '#FFF', padding: '28px', border: '1px solid #DDD', height: 'fit-content' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '16px', borderBottom: '1px solid #EEE', paddingBottom: '8px' }}>Order Total</h3>
        <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
          <span>Items ({cartItems.length}):</span>
          <span>₹{totalAmount.toLocaleString('en-IN')}</span>
        </p>
        <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.9rem' }}>
          <span>Shipping:</span>
          <span style={{ color: '#2E7D32' }}>COMPLIMENTARY</span>
        </p>
        <div style={{ borderTop: '2px solid #EEE', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
          <span>Grand Total:</span>
          <span>₹{totalAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
