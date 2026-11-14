import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Dresses', 'Tops', 'Shirts', 'Trousers', 'Co-ord Sets', 'Outerwear', 'Accessories'];

export default function AdminProductsPage() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: 'Dresses', price: '', stock: 10, description: '' });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState('');

  const loadProducts = () => {
    client.get('/products')
      .then(res => setProducts(res.data.data || []))
      .catch(err => setMsg('Error: ' + err.message));
  };

  useEffect(() => { loadProducts(); }, []);

  if (!isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '12px' }}>Admin Atelier Access Required</h2>
        <p style={{ color: '#777', marginBottom: '20px' }}>Please login with administrator credentials (admin@closete.com).</p>
        <Link to="/login" style={{ padding: '10px 20px', background: '#0A0A0A', color: '#FFF', textDecoration: 'none' }}>Go to Login</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80']
    };

    const request = editingId ? client.put(`/products/${editingId}`, payload) : client.post('/products', payload);
    request.then(() => {
      setMsg(editingId ? 'Piece updated!' : 'Piece created via API!');
      setEditingId(null);
      setFormData({ name: '', category: 'Dresses', price: '', stock: 10, description: '' });
      loadProducts();
    }).catch(err => setMsg('Failed: ' + (err.response?.data?.message || err.message)));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this piece?')) return;
    client.delete(`/products/${id}`)
      .then(() => { setMsg('Piece deleted.'); loadProducts(); })
      .catch(err => setMsg('Delete error: ' + err.message));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '8px' }}>Atelier Product Management (CRUD)</h1>
      <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Connected to Express + MongoDB backend with JWT authentication.</p>
      {msg && <div style={{ background: '#F0EAE1', padding: '10px', marginBottom: '16px', fontSize: '0.85rem' }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.9fr', gap: '32px' }}>
        {/* Create / Edit Form */}
        <form onSubmit={handleSubmit} style={{ background: '#FFF', padding: '24px', border: '1px solid #DDD' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>{editingId ? 'Edit Piece' : 'Create New Piece'}</h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>NAME</label>
            <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #CCC' }} required />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>CATEGORY</label>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #CCC' }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>PRICE (INR ₹)</label>
            <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #CCC' }} required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>DESCRIPTION</label>
            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="2" style={{ width: '100%', padding: '8px', border: '1px solid #CCC' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#0A0A0A', color: '#FFF', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            {editingId ? 'Save Changes' : '+ Add Piece to Catalog'}
          </button>
        </form>

        {/* Product List Table */}
        <div style={{ background: '#FFF', padding: '24px', border: '1px solid #DDD', maxHeight: '500px', overflowY: 'auto' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Catalog Inventory ({products.length})</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEE', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>Garment</th>
                <th style={{ padding: '8px' }}>Category</th>
                <th style={{ padding: '8px' }}>Price</th>
                <th style={{ padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const id = p._id || p.id;
                return (
                  <tr key={id} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '8px', fontWeight: 500 }}>{p.name}</td>
                    <td style={{ padding: '8px', color: '#666' }}>{p.category}</td>
                    <td style={{ padding: '8px' }}>₹{Number(p.price).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '8px' }}>
                      <button onClick={() => { setEditingId(id); setFormData(p); }} style={{ background: 'none', border: 'none', color: '#C5A880', cursor: 'pointer', marginRight: '8px' }}>Edit</button>
                      <button onClick={() => handleDelete(id)} style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
