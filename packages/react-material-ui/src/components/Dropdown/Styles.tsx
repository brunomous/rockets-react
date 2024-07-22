import { Box, styled } from '@mui/material';

type Props = {
  isLeftSide: boolean;
};

export const IconContainer = styled(Box, {
  // prevent jest error
  shouldForwardProp: (propName) => propName !== 'isLeftSide',
})<Props>(({ isLeftSide }) => ({
  display: 'flex',
  marginRight: isLeftSide ? '8px' : '-4px',
  marginLeft: isLeftSide ? '-4px' : '8px',
}));
