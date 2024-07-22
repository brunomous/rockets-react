import React from 'react';
import {
  useTheme,
  useMediaQuery,
  DialogContent,
  DialogActions,
  DialogProps,
} from '@mui/material';
import { CustomDialog, CustomDialogTitle } from './Styles';

export interface CustomDialogProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  dividers?: boolean;
}

const Dialog = (props: CustomDialogProps & DialogProps) => {
  const {
    open,
    handleClose,
    title,
    children,
    footer,
    dividers = false,
  } = props;

  const theme = useTheme();
  const fullScreen =
    props?.fullScreen || useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <CustomDialog
      {...props}
      onClose={handleClose}
      open={open}
      fullScreen={fullScreen}
    >
      {title && (
        <CustomDialogTitle onClose={handleClose}>{title}</CustomDialogTitle>
      )}

      {children && (
        <DialogContent dividers={dividers}>{children}</DialogContent>
      )}

      {footer && <DialogActions>{footer}</DialogActions>}
    </CustomDialog>
  );
};

export default Dialog;
