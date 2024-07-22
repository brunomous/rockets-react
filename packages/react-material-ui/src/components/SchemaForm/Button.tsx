import React, { PropsWithChildren } from 'react';
import { Button as MUIButton } from '@mui/material';

const Button = ({ children }: PropsWithChildren) => (
  <MUIButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
    {children}
  </MUIButton>
);

export default Button;
