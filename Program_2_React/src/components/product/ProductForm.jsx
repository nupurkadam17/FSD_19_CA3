import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Dresses', 'Tops', 'Shirts', 'Trousers', 'Co-ord Sets', 'Outerwear', 'Accessories'];

export default function ProductForm({ onAddProduct }) {
  const navigate = useNavigate();

  // Controlled component state using useState
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dresses',
    price: '',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description: '',
    sizes: ['S', 'M', 'L']
  });

  const [errors, setErrors] = useState({});

  // useEffect Hook: Real-time validation for garment name
  useEffect(() => {
    if (formData.name && formData.name.trim().length < 3) {
      setErrors(prev => ({ ...prev, name: 'Name must be at least 3 characters.' }));
    } else {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.name;
        return copy;
      });
    }
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.name.length < 3) {
      setErrors({ name: 'Valid piece name is required.' });
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setErrors({ price: 'Please enter a valid price in INR.' });
      return;
    }

    onAddProduct({
      ...formData,
      price: Number(formData.price),
      images: [formData.image]
    });
    navigate('/shop');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '32px', background: '#FFF', border: '1px solid #D8D8D5' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>Add Atelier Piece</h2>
      <p style="color:#666; font-size:0.85rem; margin-bottom:24px;">React controlled form with useState and useEffect validation.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Garment Name</label>
          <input name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }} placeholder="e.g. Silk Drape Gown" required />
          {errors.name && <span style={{ color: '#D32F2F', fontSize: '0.75rem' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Price (INR ₹)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }} placeholder="e.g. 8490" required />
          {errors.price && <span style={{ color: '#D32F2F', fontSize: '0.75rem' }}>{errors.price}</span>}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', border: '1px solid #CCC' }} placeholder="Garment composition and silhouette details..." />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#0A0A0A', color: '#FFF', border: 'none', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
          Submit to Collection
        </button>
      </form>
    </div>
  );
}
