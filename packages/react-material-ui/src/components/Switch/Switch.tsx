import React from 'react';
import {
  Switch as MuiSwitch,
  SwitchProps,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import Text from '../Text';
import { TextProps } from 'interfaces';

type Props = {
  label?: string;
  textProps?: TextProps;
};

const Switch = (props: Props & SwitchProps) => {
  const {
    label,
    disabled,
    checked,
    onChange,
    required,
    textProps = {
      fontSize: 16,
      fontWeight: 400,
      color: 'text.primary',
    },
  } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            disabled={disabled}
            control={<MuiSwitch onChange={onChange} />}
            label={
              <Text {...textProps}>
                {label}
                {required && ' *'}
              </Text>
            }
            checked={checked}
          />
        </FormGroup>
      ) : (
        <MuiSwitch {...props} />
      )}
    </>
  );
};

export default Switch;
