// frontend/src/pages/ProductsPage.jsx
import './ProductsPage.css';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../services/api.js';
import '../App.css';
import { StoreContext } from '../store/StoreContext.jsx';
import { useContext } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import AddProductForm from '../components/AddProductForm';
import FilterSortSearch from '../components/FilterSortSearch.jsx';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtersOn, setFiltersOn] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user, token } = useContext(StoreContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/read-all-products');
      console.log('products from API:', response.data);

      const leads = await api.get('/products/read-all-leads');
      console.log('leads:', leads.data);

      const productsWithLeadCount = response.data.map((product) => {
        const count = leads.data.filter(
          (lead) => lead.product_interest === product.name
        ).length;
        return {
          ...product,
          lead_count: count,
        };
      });
      setAllProducts(productsWithLeadCount);
      setDisplayedProducts(productsWithLeadCount);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    }
  };

  if (error) {
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
        {error}
      </p>
    );
  }

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="product-container">
      {user?.email === 'admin@gmail.com' && (
        <div>
          <Button className="add-button" variant="primary" onClick={handleOpen}>
            +
          </Button>

          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddProductForm
                onProductAdded={fetchProducts}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
        </div>
      )}
      <div className="display-buttons-wrapper">
        <div>
          <h2 className="products-page-title" style={{ paddingBottom: '2rem' }}>
            Products
          </h2>
          <div className="display-buttons">
            <FilterSortSearch
              allProducts={allProducts}
              displayedProducts={displayedProducts}
              filteredProducts={filteredProducts}
              setFiltersOn={setFiltersOn}
              setDisplayedProducts={setDisplayedProducts}
              setFilteredProducts={setFilteredProducts}
              setLastSearchTerm={setLastSearchTerm}
              isAdmin={user?.email === 'admin@gmail.com'}
            />
          </div>
        </div>
      </div>

      {displayedProducts.length > 0 ? (
        <>
          {lastSearchTerm && (
            <div
              style={{
                marginTop: '1rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Search results for: '{lastSearchTerm}'
            </div>
          )}
          {filteredProducts.length === 0 && filtersOn ? (
            <div className="no-results-message">No results found</div>
          ) : (
            <div className="product-list">
              <div className="products-catalog">
                {(filteredProducts.length > 0 || filtersOn
                  ? filteredProducts
                  : displayedProducts
                ).map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      category={product.category}
                      img={product.image_url}
                      price={product.price}
                      lead_count={product.lead_count}
                      isAdmin={user?.email === 'admin@gmail.com'}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : allProducts.length > 0 ? (
        <div className="no-results-message">No results found</div>
      ) : (
        <div className="loading-message">Loading...</div>
      )}
    </div>
  );
}
