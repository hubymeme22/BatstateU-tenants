import './styles/reset.css';
import React from 'react';
import RoutingSystem from './routes/_routing';

import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RoutingSystem />
    </ThemeProvider>
  );
}

export default App;
