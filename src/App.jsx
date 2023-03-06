import './styles/reset.css';
import React from 'react';
import RoutingSystem from './routes';

import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RoutingSystem />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
