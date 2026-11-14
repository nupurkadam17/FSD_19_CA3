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
            Production-grade MERN architecture: React frontend, Express REST API, MongoDB persistent store with Mongoose schemas.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', color: 'white' }}>
            Atelier Navigation
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem', color: '#888' }}>
            <Link to="/">Editorial Lookbook</Link>
            <Link to="/shop">Complete Catalog</Link>
            <Link to="/login">Atelier Client Sign In</Link>
            <Link to="/admin">Administrator Portal</Link>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', color: 'white' }}>
            Deployment Config
          </h4>
          <div style={{ fontSize: '0.75rem', color: '#888', lineHeight: '1.6' }}>
            <div><strong>Frontend:</strong> Vercel SPA (<code>vercel.json</code>)</div>
            <div><strong>Backend:</strong> Render Web Service (<code>render.yaml</code>)</div>
            <div><strong>Database:</strong> MongoDB Atlas Persistent Cluster</div>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', color: 'white' }}>
            Course Submission
          </h4>
          <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: '1.6' }}>
            <strong>Subject:</strong> Full Stack Development (CA3)<br />
            <strong>Branch:</strong> B.E. AI & DS (Semester V)<br />
            <strong>Program 5:</strong> Full Stack Integration (MERN).
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
        <span>MERN Full Stack Integrated Platform</span>
      </div>
    </footer>
  );
}
