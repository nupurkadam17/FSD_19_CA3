import React from 'react';
import ProductForm from '../components/product/ProductForm';

export default function AddProductPage({ onAddProduct }) {
  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <ProductForm onAddProduct={onAddProduct} />
    </div>
  );
}
