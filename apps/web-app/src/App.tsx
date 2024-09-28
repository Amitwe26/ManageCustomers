import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import AppContext from './context/AppContext';
import { loginUser } from './utils/firebase';
import { QueryClient, QueryClientProvider } from 'react-query';
import RoutesComponent from './route/RouterUi';

const queryClient = new QueryClient();
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginUser({ email, password });
      console.log('Logged in:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
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
