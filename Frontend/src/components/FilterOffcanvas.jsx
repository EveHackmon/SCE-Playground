// components/FilterOffcanvas.jsx
import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Offcanvas, Form } from 'react-bootstrap';
import RangeSlider from './RangeSlider';
import { filterProducts } from '../utils/filterUtils';
import './buttons.css';

const FilterOffcanvas = ({
  displayedProducts,
  filteredProducts,
  setFilteredProducts,
  isAdmin,
  setFiltersOn,
}) => {
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    minPrice: 0,
    maxPrice: 0,
    priceRangeMin: 0,
    priceRangeMax: 0,
    minLeadCount: 0,
    maxLeadCount: 0,
    leadRangeMin: 0,
    leadRangeMax: 0,
  });

  const productsToFilter =
    filteredProducts.length > 0 ? filteredProducts : displayedProducts;

  const categories = [
    ...new Set(
      [...displayedProducts]
        .map((product) => product.category)
        .filter((category) => category)
    ),
  ];
  useEffect(() => {
    if (displayedProducts.length > 0) {
      const prices = displayedProducts.map((p) => p.price);
      const leads = displayedProducts.map((p) => p.lead_count);
      const minP = Math.min(...prices);
      const maxP = Math.max(...prices);
      const minL = Math.min(...leads);
      const maxL = Math.max(...leads);
      setFilters((prev) => ({
        ...prev,
        minPrice: minP,
        maxPrice: maxP,
        priceRangeMin: minP,
        priceRangeMax: maxP,
        minLeadCount: minL,
        maxLeadCount: maxL,
        leadRangeMin: minL,
        leadRangeMax: maxL,
      }));
    }
  }, [displayedProducts]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    const filtered = filterProducts(displayedProducts, filters);
    setFiltersOn(true);
    setFilteredProducts(filtered);
    handleClose();
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setFilters((prev) => {
      const updatedCategories = checked
        ? [...prev.category, value]
        : prev.category.filter((c) => c !== value);
      return {
        ...prev,
        category: updatedCategories,
      };
    });
  };

  const handlePriceChange = (newPriceRange) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: newPriceRange[0],
      maxPrice: newPriceRange[1],
    }));
  };

  const handleLeadCountChange = (newLeadCountRange) => {
    setFilters((prev) => ({
      ...prev,
      minLeadCount: newLeadCountRange[0],
      maxLeadCount: newLeadCountRange[1],
    }));
  };

  const handleClear = () => {
    const prices = displayedProducts.map((product) => product.price);
    const lead_counts = displayedProducts.map((product) => product.lead_count);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const minL = Math.min(...lead_counts);
    const maxL = Math.max(...lead_counts);

    setFilters({
      category: [],
      minPrice: minP,
      maxPrice: maxP,
      minLeadCount: minL,
      maxLeadCount: maxL,
    });

    setFiltersOn(false);
    setFilteredProducts([]);
  };

  return (
    <>
      <Button
        className="filter-sort-search"
        variant="outline-primary"
        onClick={handleShow}
      >
        Filter by <i className="bi bi-funnel"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Accordion defaultActiveKey="">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Filter by category</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    {categories.map((category) => (
                      <Form.Check
                        key={category}
                        type="checkbox"
                        label={category}
                        name="category"
                        value={category}
                        checked={filters.category.includes(category)}
                        className="checkbox-right"
                        style={{ display: 'flex', gap: '0.5rem' }}
                        onChange={handleCategoryChange}
                      />
                    ))}
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Filter by price Range</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <RangeSlider
                      title=""
                      min={Math.min(...displayedProducts.map((p) => p.price))}
                      max={Math.max(...displayedProducts.map((p) => p.price))}
                      onChange={handlePriceChange}
                      value={[filters.minPrice, filters.maxPrice]}
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              {isAdmin && (
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Filter by lead Count Range
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3">
                      <RangeSlider
                        title=""
                        min={Math.min(
                          ...displayedProducts.map((p) => p.lead_count)
                        )}
                        max={Math.max(
                          ...displayedProducts.map((p) => p.lead_count)
                        )}
                        onChange={handleLeadCountChange}
                        value={[filters.minLeadCount, filters.maxLeadCount]}
                      />
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>

            <Form.Group className="d-flex justify-content-center mt-4">
              <Button variant="success" onClick={handleApply} className="me-2">
                Apply
              </Button>
              <Button variant="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterOffcanvas;
