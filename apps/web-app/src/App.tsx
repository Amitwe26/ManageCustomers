import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomersList from './screens/CustomersList';
import Calendar from './screens/Calendar';
import NavBar from './components/NavBarUi/SideNavUi';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import CustomerDetails from './components/CastumerDetailsUi/CustomerDetails';
import AppContext from './context/AppContext';

function App() {
  return (
    <AppContext>
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
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
