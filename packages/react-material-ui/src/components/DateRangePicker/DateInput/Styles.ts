import { styled } from '@mui/material/styles';

export const CustomInput = styled('input')(({}) => ({
  border: 'none',
  textAlign: 'center',
  textTransform: 'uppercase',
  outline: 'none',
  fontFamily: 'inherit',
  fontSize: '1rem',
  width: '112px',
  '&::-webkit-calendar-picker-indicator': {
    display: 'none',
  },
  '&::-moz-calendar-picker-indicator': {
    display: 'none',
  },
}));
