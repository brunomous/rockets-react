import React, { PropsWithChildren } from 'react';

import type { RJSFSchema, UiSchema, CustomValidator } from '@rjsf/utils';
import type { IChangeEvent, FormProps } from '@rjsf/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';

import { SchemaForm, SchemaFormProps } from '../../../components/SchemaForm';
import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';

type Action = 'creation' | 'edit' | 'details' | null;

type ModalFormSubmoduleProps = PropsWithChildren<
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
  title?: string;
  queryResource: string;
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

const ModalFormSubmodule = (props: ModalFormSubmoduleProps) => {
  const {
    queryResource,
    viewMode,
    widgets,
    onClose,
    title,
    formSchema,
    formUiSchema,
    formData,
    customValidate,
    submitButtonTitle,
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
    <Dialog open={viewMode !== null} maxWidth="md" fullWidth onClose={onClose}>
      <DialogTitle>{formSchema?.title || title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: (theme) => theme.spacing(1),
          top: (theme) => theme.spacing(1),
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <SchemaForm.Form
          schema={{
            ...formSchema,
            required: formSchema?.required || [],
            properties: formSchema?.properties || {},
            title: '',
          }}
          uiSchema={formUiSchema}
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
              justifyContent="flex-end"
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
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormSubmodule;
