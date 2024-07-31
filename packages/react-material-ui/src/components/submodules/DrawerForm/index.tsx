import React, { PropsWithChildren } from 'react';

import type { RJSFSchema, UiSchema, CustomValidator } from '@rjsf/utils';
import type { IChangeEvent, FormProps } from '@rjsf/core';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';

import { SchemaForm, SchemaFormProps } from '../../../components/SchemaForm';

import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';

type Action = 'creation' | 'edit' | 'details' | null;

type DrawerFormSubmoduleProps = PropsWithChildren<
  Omit<
    SchemaFormProps,
    | 'schema'
    | 'uiSchema'
    | 'validator'
    | 'onSubmit'
    | 'noHtml5Validate'
    | 'showErrorList'
    | 'formData'
    | 'readonly'
    | 'customValidate'
  >
> & {
  queryResource: string;
  title?: string;
  formSchema?: RJSFSchema;
  viewMode?: Action | null;
  formUiSchema?: UiSchema;
  formData?: Record<string, unknown> | null;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
  onClose?: () => void;
  customValidate?: CustomValidator;
  widgets?: FormProps['widgets'];
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
};

const DrawerFormSubmodule = (props: DrawerFormSubmoduleProps) => {
  const {
    queryResource,
    viewMode,
    widgets,
    formSchema,
    formUiSchema,
    formData,
    customValidate,
    submitButtonTitle,
    onClose,
    cancelButtonTitle,
    children,
    onSuccess,
    onError,
    ...otherProps
  } = props;
  const { post, patch } = useDataProvider();

  const { execute: createItem, isPending: isLoadingCreation } = useQuery(
    (data: Record<string, unknown>) =>
      post({
        uri: `/${queryResource}`,
        body: data,
      }),
    false,
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const { execute: editItem, isPending: isLoadingEdit } = useQuery(
    (data: Record<string, unknown>) =>
      patch({
        uri: `/${queryResource}/${data.id}`,
        body: data,
      }),
    false,
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const handleFormSubmit = async (
    values: IChangeEvent<Record<string, unknown>>,
  ) => {
    const fields = values.formData || {};

    if (viewMode === 'creation') {
      await createItem(fields);
    }

    if (viewMode === 'edit') {
      await editItem(fields);
    }
  };

  const _widgets = {
    TextWidget: CustomTextFieldWidget,
    ...widgets,
  };

  return (
    <Drawer open={viewMode !== null} anchor="right">
      <Box padding={4} mb={2}>
        <SchemaForm.Form
          schema={{
            ...formSchema,
            required: formSchema?.required || [],
            properties: formSchema?.properties || {},
            title: '',
          }}
          uiSchema={{
            ...formUiSchema,
          }}
          validator={validator}
          onSubmit={handleFormSubmit}
          noHtml5Validate={true}
          showErrorList={false}
          formData={formData}
          readonly={viewMode === 'details'}
          widgets={_widgets}
          customValidate={customValidate}
          {...otherProps}
        >
          <>
            {children}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mt={4}
            >
              {viewMode !== 'details' && (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoadingCreation || isLoadingEdit}
                  sx={{ flex: 1, mr: 2 }}
                >
                  {isLoadingCreation || isLoadingEdit ? (
                    <CircularProgress sx={{ color: 'white' }} size={24} />
                  ) : (
                    submitButtonTitle || 'Save'
                  )}
                </Button>
              )}
              <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
                {cancelButtonTitle || 'Close'}
              </Button>
            </Box>
          </>
        </SchemaForm.Form>
      </Box>
    </Drawer>
  );
};

export default DrawerFormSubmodule;
