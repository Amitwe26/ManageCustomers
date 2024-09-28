import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import AppContext from './context/AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import RoutesComponent from './route/RouterUi';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <ThemeProvider theme={theme}>
          <Router>
            <RoutesComponent />
          </Router>
        </ThemeProvider>
      </AppContext>
    </QueryClientProvider>
  );
}

export default App;
