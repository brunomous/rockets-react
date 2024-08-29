import React, { useState } from 'react';
import type { IChangeEvent } from '@rjsf/core';
import {
  Box,
  Drawer,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';

import { SchemaForm } from '../../../components/SchemaForm';
import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';
import { FormSubmoduleProps } from '../types/Form';

const DrawerFormSubmodule = (props: FormSubmoduleProps) => {
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
    onDeleteSuccess,
    onDeleteError,
    onPrevious,
    onNext,
    isLoading,
    viewIndex,
    rowsPerPage,
    currentPage,
    pageCount,
    isVisible,
    ...otherProps
  } = props;

  const [fieldValues, setFieldValues] =
    useState<FormSubmoduleProps['formData']>(null);

  const { post, patch, del } = useDataProvider();

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

  const { execute: deleteItem, isPending: isLoadingDelete } = useQuery(
    (data: Record<string, unknown>) =>
      del({
        uri: `/${queryResource}/${data.id}`,
      }),
    false,
    {
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
    },
  );

  const handleFieldChange = async (
    values: IChangeEvent<Record<string, unknown>>,
  ) => {
    setFieldValues(values.formData);
  };

  const handleFormSubmit = async () => {
    if (viewMode === 'creation') {
      await createItem(fieldValues);
    }

    if (viewMode === 'edit') {
      await editItem(fieldValues);
    }
  };

  const _widgets = {
    TextWidget: CustomTextFieldWidget,
    ...widgets,
  };

  return (
    <Drawer open={isVisible} anchor="right">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        mt={2}
        ml={1}
      >
        <Typography variant="h5" sx={{ marginLeft: 3, fontSize: '20px' }}>
          {viewMode === 'creation'
            ? 'Add Data'
            : viewMode === 'edit'
            ? 'Edit Data'
            : 'View Data'}
        </Typography>
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
      </Box>
      <Box
        padding={4}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <SchemaForm.Form
          schema={{
            ...formSchema,
            required: formSchema?.required || [],
            properties: formSchema?.properties || {},
            title: '',
          }}
          uiSchema={{
            ...formUiSchema,
            'ui:submitButtonOptions': { norender: true },
          }}
          validator={validator}
          noHtml5Validate={true}
          showErrorList={false}
          formData={formData}
          widgets={_widgets}
          customValidate={customValidate}
          readonly={viewMode === 'details'}
          onChange={handleFieldChange}
          {...otherProps}
        >
          {children}
        </SchemaForm.Form>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent={
            viewMode === 'creation' ? 'flex-end' : 'space-between'
          }
        >
          {viewMode !== 'creation' && (
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                onClick={() => onPrevious(formData)}
                disabled={isLoading || (currentPage === 1 && viewIndex === 1)}
              >
                <ChevronLeft sx={{ color: '#333' }} />
              </IconButton>
              <Typography>
                {isLoading ? '' : `Row ${viewIndex}/${rowsPerPage}`}
              </Typography>
              <IconButton
                onClick={() => onNext(formData)}
                disabled={
                  isLoading ||
                  (currentPage === pageCount && viewIndex === rowsPerPage)
                }
              >
                <ChevronRight sx={{ color: '#333' }} />
              </IconButton>
            </Box>
          )}
          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            {props.customFooterContent}
            {viewMode === 'creation' && !props.hideCancelButton && (
              <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
                {cancelButtonTitle || 'Cancel'}
              </Button>
            )}
            {viewMode === 'edit' && !props.hideCancelButton && (
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteItem(formData)}
                sx={{ flex: 1 }}
              >
                {isLoadingDelete ? (
                  <CircularProgress sx={{ color: 'white' }} size={24} />
                ) : (
                  cancelButtonTitle || 'Delete'
                )}
              </Button>
            )}
            {viewMode === 'details' && !props.hideCancelButton && (
              <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
                {cancelButtonTitle || 'Close'}
              </Button>
            )}
            {viewMode !== 'details' && (
              <Button
                type="submit"
                variant="contained"
                disabled={isLoadingCreation || isLoadingEdit || isLoadingDelete}
                onClick={handleFormSubmit}
                sx={{ flex: 1 }}
              >
                {isLoadingCreation || isLoadingEdit ? (
                  <CircularProgress sx={{ color: 'white' }} size={24} />
                ) : (
                  submitButtonTitle || 'Save'
                )}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerFormSubmodule;
