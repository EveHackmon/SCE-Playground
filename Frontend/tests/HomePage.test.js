// tests/HomePage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import HomePage from '../src/pages/HomePage.jsx';
import { StoreContext } from '../src/store/StoreContext.jsx';

// MOCK api.js to avoid import.meta.env crash
jest.mock('../src/services/api.js', () => ({}));

describe('HomePage', () => {
  test('renders the welcome message', () => {
    const mockContext = { user: { firstName: 'Alice' } };

    render(
      <StoreContext.Provider value={mockContext}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </StoreContext.Provider>
    );

    // ✅ contains the expected text somewhere in the heading
    expect(screen.getByText(/Welcome to SCE Software Ltd\./i)).toBeInTheDocument();
  });
});