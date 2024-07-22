import React from 'react';
import { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';

const ThemeProvider = (props: ThemeProviderProps) => {
  return (
    <MuiThemeProvider {...props}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>{props.children}</StyledEngineProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
