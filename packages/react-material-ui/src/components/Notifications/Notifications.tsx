import React from 'react';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import { IconButton, Badge } from '@mui/material';

type Props = {
  amount: number;
  onClick?: () => void;
};

const Notifications = ({ amount, onClick }: Props) => (
  <IconButton sx={{ color: 'text.secondary' }} onClick={onClick}>
    <Badge badgeContent={amount} color="error" data-testid="badge">
      <NotificationsOutlined />
    </Badge>
  </IconButton>
);

export default Notifications;
