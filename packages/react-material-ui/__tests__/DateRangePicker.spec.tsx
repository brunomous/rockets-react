/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import DateRangePicker from '../src/components/DateRangePicker';

describe('DateRangePicker Component', () => {
  test('should render correctly', () => {
    const { getByRole } = render(<DateRangePicker />);
    const field = getByRole('group');

    expect(field).toBeInTheDocument();
  });

  test('should render correctly with label', () => {
    const { getByText, getByRole } = render(
      <DateRangePicker label="Date Range" />,
    );
    const field = getByRole('group');
    const legend = getByText('Date Range');

    expect(field).toBeInTheDocument();
    expect(legend).toBeInTheDocument();
  });

  test('should render correctly with label and display two inputs', () => {
    const { getByText, getByRole, getByTestId } = render(
      <DateRangePicker label="Date Range" />,
    );
    const field = getByRole('group');
    const legend = getByText('Date Range');
    const startDateInput = getByTestId('start-date-input');
    const endDateInput = getByTestId('end-date-input');

    expect(field).toBeInTheDocument();
    expect(legend).toBeInTheDocument();
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
  });

  test('should set input values when prop is passed', () => {
    const { getByTestId } = render(
      <DateRangePicker
        label="Date Range"
        value={{
          startDate: new Date('2024-12-10T18:34:37.172Z'),
          endDate: new Date('2025-01-08T18:34:37.172Z'),
        }}
      />,
    );
    const startDateInput = getByTestId('start-date-input');
    const endDateInput = getByTestId('end-date-input');

    expect(startDateInput).toHaveValue('2024-12-10');
    expect(endDateInput).toHaveValue('2025-01-08');
  });
});
