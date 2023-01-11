import React, { FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio, { RadioProps } from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { TypographyProps } from '@mui/material/Typography';
import Text from '../Text';

export type RadioOptions = {
  label: string;
  value: unknown;
  disabled?: boolean;
};

type CustomRadioGroupProps = {
  options: RadioOptions[];
  label?: string;
  required?: boolean;
  row?: boolean;
  disabled?: boolean;
  fontFamily?: TypographyProps['fontFamily'];
  fontSize?: TypographyProps['fontSize'];
  fontWeight?: TypographyProps['fontWeight'];
  color?: TypographyProps['color'];
};

const Radio: FC<CustomRadioGroupProps & RadioGroupProps & RadioProps> = (
  props,
) => {
  const {
    id,
    options,
    label,
    required,
    row,
    value,
    onChange,
    disabled,
    fontFamily,
    fontSize = 16,
    fontWeight = 400,
    color = 'text.primary',
  } = props;

  return (
    <>
      {label && (
        <Text
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
        >
          {label}
          {required && ' *'}
        </Text>
      )}
      <RadioGroup id={id} value={`${value}`} row={row} onChange={onChange}>
        {options.map((option: RadioOptions, i: number) => (
          <FormControlLabel
            control={<MuiRadio name={`${id}-${i}`} color="primary" key={i} />}
            label={`${option.label}`}
            value={`${option.value}`}
            key={i}
            disabled={disabled || option.disabled}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default Radio;
