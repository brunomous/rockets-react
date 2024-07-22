import React from 'react';
import { Link as MuiLink, LinkProps } from '@mui/material';

const Link = (props: LinkProps) => {
  const { children, color = 'primary.dark', sx } = props;

  return (
    <MuiLink
      color={color}
      {...props}
      sx={[
        {
          textDecoration: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
