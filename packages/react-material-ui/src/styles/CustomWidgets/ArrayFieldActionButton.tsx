import React from 'react';
import { Box, IconButton } from '@mui/material';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material';

type Props = {
  type: 'add' | 'remove';
  onClick: () => void;
};

const ArrayFieldActionButton = (props: Props) => {
  const { type, onClick } = props;

  return (
    <Box sx={{ marginTop: 3, marginLeft: 1 }}>
      <IconButton onClick={onClick}>
        {type === 'add' ? (
          <AddCircleOutlineIcon color="primary" />
        ) : (
          <DeleteOutlineIcon />
        )}
      </IconButton>
    </Box>
  );
};

export default ArrayFieldActionButton;
