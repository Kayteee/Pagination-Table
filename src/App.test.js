import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { dataLoading } from './constants';

   test('renders kickstarter projects table', () => {
       render(<App />);
       const headerElement = screen.getByText(dataLoading);
       expect(headerElement).toBeInTheDocument();
   });