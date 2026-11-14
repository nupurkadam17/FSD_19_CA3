import React, { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 100,
      backgroundColor: 'var(--color-black)',
      color: 'white',
      padding: '14px 24px',
      fontSize: '0.75rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      fontWeight: 600,
      borderLeft: `4px solid ${type === 'danger' ? 'var(--color-danger)' : 'var(--color-accent)'}`,
      boxShadow: '0 8px 30px rgba(0,0,0,0.25)'
    }}>
      {message}
    </div>
  );
}
