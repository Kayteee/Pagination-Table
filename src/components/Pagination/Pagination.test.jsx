import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { nextButton, prevButton } from '../../constants';

describe('Pagination Component', () => {
  const totalRecords = 50;
  const recordsPerPage = 10;
  const currentPage = 1;
  const onPageChange = jest.fn();

  it('should render pagination buttons correctly', () => {
    render(
      <Pagination
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText(`< ${prevButton}`)).toBeDisabled();
    expect(screen.getByText(`${nextButton} >`)).toBeEnabled();
    expect(screen.getByText('1')).toHaveClass('active');
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onPageChange with the correct page number when next button is clicked', () => {
    render(
      <Pagination
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText(`${nextButton} >`));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with the correct page number when previous button is clicked', () => {
    render(
      <Pagination
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        currentPage={2}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText(`< ${prevButton}`));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange with the correct page number when a page number button is clicked', () => {
    render(
      <Pagination
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
