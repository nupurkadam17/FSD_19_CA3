import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../data/sampleProducts';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
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
        boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
        animation: 'slideDrawer 0.3s ease'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: 'var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
            Shopping Bag ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
          </h3>
          <button onClick={onClose} style={{ fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '8px' }}>
                Your Bag is Empty
              </p>
              <p style={{ color: '#777', fontSize: '0.85rem' }}>
                Discover our curated silhouettes in the collection.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map(item => (
                <div key={item.cartItemId} style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--color-lightgrey)'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '80px', height: '105px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>{item.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          style={{ fontSize: '0.75rem', color: '#999', textDecoration: 'underline' }}
                        >
                          Remove
                        </button>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#777', marginTop: '2px' }}>
                        Size: {item.selectedSize}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', border: '1px solid var(--color-softgrey)' }}>
                        <button
                          onClick={() => onUpdateQty(item.cartItemId, -1)}
                          style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          −
                        </button>
                        <span style={{ width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.cartItemId, 1)}
                          style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cartItems.length > 0 && (
          <div style={{ padding: '24px', borderTop: 'var(--border-subtle)', backgroundColor: 'var(--color-offwhite)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span>Delivery</span>
              <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-softgrey)', fontWeight: 700, fontSize: '1.05rem' }}>
              <span>Estimated Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="btn-primary"
              style={{ width: '100%', marginTop: '16px', textAlign: 'center' }}
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
