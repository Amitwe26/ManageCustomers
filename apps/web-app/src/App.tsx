import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import AppContext from './context/AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import RoutesComponent from './route/RouterUi';
import { useTranslation } from 'react-i18next';
import './i18n';

const queryClient = new QueryClient();
function App() {
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <ThemeProvider
          theme={{
            ...theme,
            direction: Boolean(i18n.language === 'he'),
          }}
        >
          <Router>
            <RoutesComponent />
          </Router>
        </ThemeProvider>
      </AppContext>
    </QueryClientProvider>
  );
}

export default App;
