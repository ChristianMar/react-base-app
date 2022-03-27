import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import customTheme from '../../styles/UITheme';

export const AppLayout = ({ children }) => (
  <ThemeProvider theme={customTheme}>
    {children}
    <Button variant="contained">Contained</Button>
  </ThemeProvider>
);

AppLayout.propTypes = {
  children: PropTypes.node,
};
