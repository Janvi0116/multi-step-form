import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MultiStepForm from './components/MultiStepForm';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MultiStepForm />
    </ThemeProvider>
  );
}

export default App;