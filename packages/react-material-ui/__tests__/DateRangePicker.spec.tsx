/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, getByRole } from '@testing-library/react';
import {
  LocalizationProvider,
  MuiPickersAdapter,
  MuiPickersAdapterContext,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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

  // test('should open popover on field click', () => {
  //   const { getByRole } = render(<DateRangePicker label="Date Range" />);
  //   const field = getByRole('group');

  //   expect(field).toBeInTheDocument();

  //   fireEvent.click(field);

  //   expect(getByRole('presentation')).toBeInTheDocument();
  // });
});
