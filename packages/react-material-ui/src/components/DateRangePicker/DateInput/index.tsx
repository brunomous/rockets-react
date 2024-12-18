import React, { InputHTMLAttributes, forwardRef } from 'react';
import { CustomInput } from './Styles';

type Props = InputHTMLAttributes<HTMLInputElement>;

const DateInput = forwardRef((props: Props, ref: any) => {
  return <CustomInput ref={ref} type="date" {...props} />;
});

export default DateInput;
