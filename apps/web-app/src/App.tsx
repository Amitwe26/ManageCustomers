import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomersList from './screens/CustomersList';
import Calendar from './screens/Calendar';
import NavBar from './components/NavBarUi/SideNavUi';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import CustomerDetails from './components/CastumerDetailsUi/CustomerDetails';
import AppContext from './context/AppContext';
import { loginUser } from './utils/firebase';

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
    <AppContext>
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
            <NavBar />
            <RouteContainer>
              <Routes>
                <Route path={'/'} element={<CustomersList />} />
                <Route path={'/calendar'} element={<Calendar />} />
                <Route
                  path={'/customers/customer/:id'}
                  element={<CustomerDetails />}
                />
              </Routes>
            </RouteContainer>
          </Container>
        </Router>
      </ThemeProvider>
    </AppContext>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  background-color: white;
`;

const RouteContainer = styled.div`
  background-color: rgb(242, 249, 252, 0.9);
  border-top: 1px solid rgba(243, 243, 243, 0.71);
  margin-top: 25px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
