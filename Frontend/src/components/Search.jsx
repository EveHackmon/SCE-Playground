import { Form, Button } from 'react-bootstrap';
import './buttons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { searchProducts } from '../utils/searchUtils';

function Search(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value || '';
    setSearchTerm(value);
  };

  const handleSearchClick = () => {
    const results = searchProducts(props.allProducts, searchTerm);
    props.setFilteredProducts([]);
    props.setDisplayedProducts(results);
    props.setLastSearchTerm(searchTerm);
    setSearchTerm('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      handleSearchClick();
    }
  };

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <Form.Control
        type="search"
        placeholder="Search..."
        className="me-2 filter-sort-search"
        aria-label="Search"
        style={{
          width: '200px',
        }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button
        className="filter-sort-search"
        variant="outline-primary"
        style={{
          width: '60px',
          position: 'relative',
        }}
        onClick={handleSearchClick}
        type="submit"
        disabled={searchTerm.trim() === ''}
      >
        <i className="bi bi-search me-1"></i>

        {searchTerm.trim() === '' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              opacity: 0.2,
              cursor: 'not-allowed',
              borderRadius: '16px',
            }}
          />
        )}
      </Button>
    </Form>
  );
}

export default Search;
