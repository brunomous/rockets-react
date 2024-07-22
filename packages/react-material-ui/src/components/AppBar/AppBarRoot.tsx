import React, { ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import { AppBarContext } from './hooks/useAppBarRoot';

export type AppBarRootProps = {
  children: ReactNode;
};

/**
 * The AppBarRoot component acts as a wrapper for the context API shared
 * with the other parts of the AppBar composition.
 *
 * @see {@link AppBar}
 * @param props - Component props.
 */
export const AppBarRoot = (props: AppBarRootProps) => {
  const { children } = props;

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileOpen = () => {
    setIsMobileOpen((prv) => !prv);
  };

  return (
    <AppBarContext.Provider
      value={{
        isMobileOpen,
        toggleMobileOpen,
      }}
    >
      <Box sx={{ display: 'flex' }} id="AppBarRoot">
        {children}
      </Box>
    </AppBarContext.Provider>
  );
};

export default AppBarRoot;
