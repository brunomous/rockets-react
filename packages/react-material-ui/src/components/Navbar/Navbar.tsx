import React from 'react';
import { IconButton, Box, SxProps, Theme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import Notifications from '../Notifications';
import Text from '../Text';
import HeaderAccount, { HeaderAccountProps } from '../HeaderAccount';

export type NavbarProps = {
  drawerToggle?: () => void;
  showNotifications?: boolean;
  notificationsNumber?: number;
  notificationsOnClick?: () => void;
  avatar?: string;
  text?: string;
  subText?: string;
  headerMenuOptions?: HeaderAccountProps['menuOptions'];
  sx?: SxProps<Theme>;
};

const Navbar = ({
  drawerToggle,
  showNotifications,
  notificationsNumber,
  notificationsOnClick,
  avatar,
  text,
  subText,
  headerMenuOptions,
  sx,
}: NavbarProps) => {
  return (
    <Box
      data-testid="navbarContainer"
      sx={[
        (theme) => ({
          position: 'relative',
          padding: '12px 24px',
          ...(theme.palette.mode === 'light' && {
            backgroundColor: theme.palette.common.white,
          }),
          '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: '0',
            height: '1px',
            background: '#e5e7eb',
            left: '40px',
            right: '40px',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box display="flex">
        {drawerToggle && (
          <Text color="text.primary">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={drawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Text>
        )}
        <Box display="flex" flex={1} justifyContent="flex-end">
          {showNotifications && notificationsNumber && (
            <Notifications
              amount={notificationsNumber}
              onClick={notificationsOnClick}
            />
          )}
          <HeaderAccount
            avatar={avatar}
            text={text}
            subText={subText}
            menuOptions={headerMenuOptions}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
