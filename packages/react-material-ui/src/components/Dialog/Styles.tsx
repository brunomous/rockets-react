import React from 'react';
import {
  styled,
  Dialog,
  DialogProps,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const CustomDialog = styled(Dialog, {
  // prevent jest error
  shouldForwardProp: (propName) => propName !== 'handleClose',
})<DialogProps>(({ theme }) => ({
  '& .MuiDialogContent-root': {
    minWidth: 300,
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const CustomDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export { CustomDialog, CustomDialogTitle };
