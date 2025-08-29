import React from 'react';

export default function WhatsAppBot() {
  const openChat = () => {
    const phone = '56989194282';
    const message = encodeURIComponent('Hello! I need help.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener');
  };

  return (
    <button
      onClick={openChat}
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        border: 'none',
        color: '#fff',
        fontSize: '28px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}
    >
      W
    </button>
  );
}