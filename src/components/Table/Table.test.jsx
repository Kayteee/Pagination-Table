import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Table from './Table';
import { dataLoading, dataError, tableHeading } from '../../constants';

const mockFetchSuccess = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { "percentage.funded": 50, "amt.pledged": 1000 },
        { "percentage.funded": 75, "amt.pledged": 2000 }
      ]),
    })
  );
};

const mockFetchFailure = () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Fetch error'))
  );
};

describe('Table Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockFetchSuccess();
    render(<Table />);
    expect(screen.getByText(dataLoading)).toBeInTheDocument();
  });

  it('should render error state if fetch fails', async () => {
    mockFetchFailure();
    render(<Table />);
    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes(dataError) && content.includes('Fetch error'))).toBeInTheDocument();
    });
  });

  it('should render table heading and data when fetch is successful', async () => {
    mockFetchSuccess();
    render(<Table />);
    await waitFor(() => {
      expect(screen.getByText(tableHeading)).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
      expect(screen.getByText('2000')).toBeInTheDocument();
    });
  });
});
