'use client';

import React, { ReactNode, Fragment } from 'react';
import { useTableRoot } from '../hooks/useTableRoot';
import { TableHeaderCell } from './TableHeaderCell';
import { HeaderProps } from '../types';

type TableHeaderCellsProps = {
  renderCell?: (cell: HeaderProps) => ReactNode;
};

/**
 * Represents a table header cell component for rendering sortable table headers.
 *
 * @param {TableCellProps} props - The props for the TableHeaderCell component.
 * @returns An array of React elements representing the table header cells.
 */
export const TableHeaderCells = ({ renderCell }: TableHeaderCellsProps) => {
  const { headers } = useTableRoot();

  return (
    <Fragment>
      {!renderCell &&
        headers.map((header) => (
          <TableHeaderCell key={header.id} cell={header} />
        ))}

      {!!renderCell &&
        headers.map((header) => {
          return (
            <Fragment key={header.id}>
              {renderCell({ ...header, key: header.id })}
            </Fragment>
          );
        })}
    </Fragment>
  );
};
