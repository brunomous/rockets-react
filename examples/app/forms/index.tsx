'use client';

import { Box, Grid as MuiGrid, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const GridItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  height: '200px',
  width: '200px',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const GridItemContent = styled(Link)(({ theme }) => ({
  marginTop: 'auto',
  textDecoration: 'none',
  color: 'black',
  fontWeight: theme.typography.fontWeightBold,
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: 18,
}));

const FormsGrid = () => {
  return (
    <>
      <h2>Forms</h2>
      <Box sx={{ padding: '32px 0' }}>
        <MuiGrid container spacing={2}>
          <MuiGrid item xs={3}>
            <GridItem>
              <GridItemContent href="/login">Login</GridItemContent>
            </GridItem>
          </MuiGrid>
          <MuiGrid item xs={3}>
            <GridItem>
              <GridItemContent href="/sign-up">Sign up</GridItemContent>
            </GridItem>
          </MuiGrid>
          <MuiGrid item xs={3}>
            <GridItem>
              <GridItemContent href="/feedback">Feedback</GridItemContent>
            </GridItem>
          </MuiGrid>
          <MuiGrid item xs={3}>
            <GridItem>
              <GridItemContent href="/payment-method-registration">
                Payment method registration
              </GridItemContent>
            </GridItem>
          </MuiGrid>
          <MuiGrid item xs={3}>
            <GridItem>
              <GridItemContent href="/forms/autocomplete">
                Autocomplete
              </GridItemContent>
            </GridItem>
          </MuiGrid>
        </MuiGrid>
      </Box>
    </>
  );
};

export default FormsGrid;
