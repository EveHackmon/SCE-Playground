import Dropdown from 'react-bootstrap/Dropdown';
import './buttons.css';
import { useState } from 'react';
import {
  sortById,
  sortPriceHighToLow,
  sortPriceLowToHigh,
  sortLeadsHighToLow,
  sortLeadsLowToHigh,
} from '../utils/sortUtils';

function SortDropdown(props) {
  const [selectedSort, setSelectedSort] = useState('Sort by');

  function displayNormal() {
    const sorted = sortById(props.productsToSort);
    props.setProductsToSort(sorted);
    setSelectedSort('Sort by');
  }
  function sortHighToLow() {
    const sorted = sortPriceHighToLow(props.productsToSort);
    props.setProductsToSort(sorted);
    setSelectedSort('Price: High to Low');
  }

  function sortLowToHigh() {
    const sorted = sortPriceLowToHigh(props.productsToSort);
    props.setProductsToSort(sorted);
    setSelectedSort('Price: Low to High');
  }

  function sortLeadsHighToLow() {
    const sorted = sortLeadsHighToLow(props.productsToSort);
    props.setProductsToSort(sorted);
    setSelectedSort('Leads: High to Low');
  }

  function sortLeadsLowToHigh() {
    const sorted = sortLeadsLowToHigh(props.productsToSort);
    props.setProductsToSort(sorted);
    setSelectedSort('Leads: Low to High');
  }

  return (
    <Dropdown>
      <Dropdown.Toggle className="filter-sort-search" variant="outline-primary">
        {selectedSort}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={displayNormal}>Sort by</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={sortHighToLow}>
          Price: High to Low
        </Dropdown.Item>
        <Dropdown.Item onClick={sortLowToHigh}>
          Price: Low to High
        </Dropdown.Item>
        {props.isAdmin && (
          <>
            <Dropdown.Item onClick={sortLeadsHighToLow}>
              Leads: High to Low
            </Dropdown.Item>
            <Dropdown.Item onClick={sortLeadsLowToHigh}>
              Leads: Low to High
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
