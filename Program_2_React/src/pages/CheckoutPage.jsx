import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formatPrice } from '../data/sampleProducts';

export default function CheckoutPage({ cartItems, onClearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'card'
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const total = subtotal;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    onClearCart();
  };

  if (isSuccess) {
    return (
      <div style={{ maxWidth: '540px', margin: '80px auto', padding: '40px', background: '#FFF', border: '1px solid #D8D8D5', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '12px' }}>Order Confirmed</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Thank you, {formData.fullName}. Your bespoke order has been sent to the atelier.</p>
        <Link to="/shop" style={{ display: 'inline-block', padding: '10px 24px', background: '#0A0A0A', color: '#FFF', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Return to Atelier
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: '540px', margin: '80px auto', padding: '40px', background: '#FFF', border: '1px solid #D8D8D5', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '12px' }}>Your Bag is Empty</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Please select pieces before proceeding to checkout.</p>
        <Link to="/shop" style={{ display: 'inline-block', padding: '10px 24px', background: '#0A0A0A', color: '#FFF', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '40px auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px' }}>
      <div style={{ background: '#FFF', padding: '32px', border: '1px solid #D8D8D5' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>Client Checkout</h2>
        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '24px' }}>Enter delivery coordinates for bespoke dispatch.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }} placeholder="First and Last Name" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }} placeholder="client@domain.com" required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }} placeholder="9876543210" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>PIN Code</label>
              <input name="pincode" value={formData.pincode} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }} placeholder="400001" required />
            </div>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Delivery Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="2" style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }} placeholder="Building, street, and landmark..." required />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#0A0A0A', color: '#FFF', border: 'none', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Place Order ({formatPrice(total)})
          </button>
        </form>
      </div>

      <div style={{ background: '#FFF', padding: '32px', border: '1px solid #D8D8D5', height: 'fit-content' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '16px', borderBottom: '1px solid #EEE', paddingBottom: '12px' }}>Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
            <span>{item.name} × {item.quantity || 1}</span>
            <span>{formatPrice(item.price * (item.quantity || 1))}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #EEE', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
