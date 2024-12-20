import React, { InputHTMLAttributes, forwardRef } from 'react';
import { CustomInput } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement>;

const DateInput = forwardRef((props: Props, ref: any) => {
  return <CustomInput ref={ref} type="date" {...props} />;
});

export default DateInput;
