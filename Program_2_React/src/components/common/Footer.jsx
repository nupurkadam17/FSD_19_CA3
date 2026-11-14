import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-black)',
      color: 'var(--color-offwhite)',
      padding: '80px 0 32px',
      marginTop: '100px',
      borderTop: '1px solid #222'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '48px',
        marginBottom: '64px'
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            CLOSETÉ
          </h2>
          <p style={{
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: '20px'
          }}>
            "STYLE IS PERSONAL. MAKE IT YOURS."
          </p>
          <p style={{ fontSize: '0.75rem', color: '#777', lineHeight: '1.7', maxWidth: '280px' }}>
            A curated women’s fashion destination built with React 18, functional components, hooks, and client-side routing.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', color: 'white' }}>
            Quick Links
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem', color: '#888' }}>
            <Link to="/">Editorial Campaign</Link>
            <Link to="/shop">Complete Catalog</Link>
            <Link to="/add-product">Add Garment (State Demo)</Link>
            <Link to="/wishlist">Saved Pieces</Link>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', color: 'white' }}>
            Curated Categories
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem', color: '#888' }}>
            <Link to="/shop?category=Dresses">Silk Maxi Dresses</Link>
            <Link to="/shop?category=Outerwear">Double-Faced Trench</Link>
            <Link to="/shop?category=Co-ord Sets">Tailored Co-ord Sets</Link>
            <Link to="/shop?category=Trousers">Fluid Gabardine Trousers</Link>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', color: 'white' }}>
            Academic Spec
          </h4>
          <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: '1.6' }}>
            <strong>Course:</strong> Full Stack Development<br />
            <strong>Semester:</strong> B.E. AI & DS (Sem V)<br />
            <strong>Program 2:</strong> Component Hierarchy, React Hooks (<code>useState</code>, <code>useEffect</code>), Props & State Lifting.
          </p>
        </div>
      </div>

      <div className="container" style={{
        borderTop: '1px solid #222',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: '#666'
      }}>
        <span>&copy; {new Date().getFullYear()} CLOSETÉ ATELIER. All rights reserved.</span>
        <span>Independent React Application Submission</span>
      </div>
    </footer>
  );
}
