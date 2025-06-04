// src/pages/LeadsGeneration.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // for .loader-overlay and .spinner
import { useEffect } from 'react';


export default function LeadsGeneration() {
  const [fullName, setFullName]       = useState('');
  const [phone, setPhone]             = useState('');
  const [email, setEmail]             = useState('');
  const [productInterest, setProductInterest] = useState('');
  const [leadSource, setLeadSource]   = useState('');
  const [otherSource, setOtherSource] = useState('');
  const [response, setResponse]       = useState(null);
  const [loading, setLoading]         = useState(false);
  const [products, setProducts]       = useState([]); 

  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
  try {
    const response = await fetch('/leads/getallproducts');
    const data = await response.json(); 
    console.log('✅ Products fetched successfully:', data);
    setProducts(data);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
  }
};

  const inputStyle = {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '100%',
    fontSize: '16px',
  };

  const submitBtnStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2196F3',
    color: '#fff',
    cursor: loading ? 'not-allowed' : 'pointer',
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!fullName || !phone || !email || !productInterest || !leadSource) {
      alert('Please fill in all fields including lead source!');
      return;
    }
    let finalSource = leadSource;
    if (leadSource === 'Other') {
      if (!otherSource) {
        alert('Please specify the other source.');
        return;
      }
      if (!/^[A-Za-z]+$/.test(otherSource)) {
        alert('Only letters are allowed in the other source field.');
        return;
      }
      finalSource = otherSource;
    }

    setLoading(true);
    try {
      const result = await axios.post('/leads/createlead', {
        full_name: fullName,
        phone,
        email,
        product_interest: productInterest,
        lead_source: finalSource,
      });
      console.log('✅ Gateway: lead added successfully', result.data);
      setResponse({ fullName, phone });
    } catch (error) {
      console.error('❌ Error creating lead:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.statusText ||
        'An error occurred while creating the lead. Please try again later.';
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* LOADER – sits above everything else when active */}
      {loading && (
        <div className="loader-overlay">
          <div className="spinner" />
        </div>
      )}

      <div
        style={{
          background: '#fff',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(0,0,0,0.15)',
          padding: '40px',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222' }}>
          Share Your Contact Info
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          <input
            type="text"
            placeholder="Full Name – Max 255 characters"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email – example@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Phone Number – 05XXXXXXXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
          <select
  value={productInterest}
  onChange={e => setProductInterest(e.target.value)}
  style={inputStyle}
  disabled={loading}
>
  <option value="">Select Product</option>
  {products.map(product => (
    <option key={product.id} value={product.name}>
      {product.name}
    </option>
  ))}
</select>

          <select
            value={leadSource}
            onChange={e => setLeadSource(e.target.value)}
            style={inputStyle}
            disabled={loading}
          >
            <option value="">Select Lead Source</option>
            <option value="Facebook">Facebook</option>
            <option value="Google">Google</option>
            <option value="Friend">Friend</option>
            <option value="Event">Event</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>

          {leadSource === 'Other' && (
            <input
              type="text"
              placeholder="Specify other source"
              value={otherSource}
              onChange={e => setOtherSource(e.target.value)}
              style={inputStyle}
              disabled={loading}
            />
          )}

          <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <button type="submit" style={submitBtnStyle} disabled={loading}>
              Submit
            </button>
          </div>
        </form>

        {response && (
          <div
            style={{
              marginTop: '30px',
              background: '#28a745',
              color: 'white',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            ✅ Thank you, <strong>{response.fullName}</strong> (Phone: <strong>{response.phone}</strong>), for submitting your details. We will contact you shortly.
          </div>
        )}
      </div>
    </div>
  );
}
