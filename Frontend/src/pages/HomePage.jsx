// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(StoreContext);

  const tileStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
  };
  const imgStyle = {
    width: '100%',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  };
  const btnStyle = {
    marginTop: '15px',
    background: '#FF9992',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  };

  return (
    <div className="home-container">
      <h1>Hi {user?.firstName}! Welcome to SCE Software Ltd.</h1>
      <p>Explore our products, check your receipts, or get support.</p>

      <div
        className="home-images"
        style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* ── REPORTS TILE ── */}
        <div style={tileStyle}>
          <img
            src="/reports.jpg"
            alt="Reports"
            onClick={() => navigate('/reports')}
          />
        </div>

        <div style={tileStyle}>
          <img src="/reports.jpg" alt="Products" />
          <button
            onClick={() => navigate('/products')}
            style={btnStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.05)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Products
          </button>
        </div>

        {/* ── MANAGE LEADS TILE ── */}
        <div style={tileStyle}>
          <img src="/lead_manager.png" alt="Lead Manager" />
          <button
            onClick={() => navigate('/lead-manager')}
            style={btnStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.05)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Lead Manager
          </button>
        </div>
      </div>
    </div>
  );
}
