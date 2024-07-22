'use client';

import React, { PropsWithChildren } from 'react';
import { alpha, Toolbar, Typography } from '@mui/material';

interface TableToolbarProps {
  numSelected: number;
}

/**
 * Represents a toolbar component for managing table actions and displaying the selected item count.
 *
 * @param {TableToolbarProps} props - The props for the TableToolbar component.
 * @returns A React element representing the table toolbar.
 */
const TableToolbar = ({
  numSelected,
  children,
}: PropsWithChildren<TableToolbarProps>) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 && (
        <>
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>

          {children}
        </>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
