import { JSONSchema7 } from 'json-schema';
import { TypographyProps, ButtonProps } from '@mui/material';

type AdvancedFieldType =
  | 'string'
  | 'email'
  | 'password'
  | 'array'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'checkboxes'
  | 'switch;';

type SelectOption = {
  value: string;
  label: string;
};

type AdvancedOption = SelectOption | string;

export type AdvancedProperty = Pick<JSONSchema7, 'properties'> & {
  type: AdvancedFieldType;
  options?: AdvancedOption[];
  advancedProperties?: Record<string, AdvancedProperty>;
};

export type AdvancedPropertiesMapper = (
  schema?: JSONSchema7,
  advancedProperties?: Record<string, AdvancedProperty>,
) => JSONSchema7['properties'];

export type FormLayout = {
  title?: string;
  submitButtonLabel?: string;
  titleTextProps?: TypographyProps;
  submitButtonProps?: ButtonProps;
};
