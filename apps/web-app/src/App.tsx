import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomersList from './screens/CustomersList';
import Calendar from './screens/Calendar';
import NavBar from './components/NavBarUi/SideNavUi';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import {
  getCustomersUser,
  getUserInfo,
  loginUser,
  observeAuthState,
} from './utils/firebase';
import { Customer } from './types/customers';
import { CustomerFields, User } from './types/userType';
import CustomerDetails from './components/CastumerDetailsUi/CustomerDetails';
import AppContext from './context/AppContext';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customers, setCustomers] = useState<Customer<CustomerFields>[]>([]);
  const [userInfo, setUserInfo] = useState<User>();

  const handleLogin = async () => {
    try {
      const user = await loginUser({ email, password });
      console.log('Logged in:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    observeAuthState(async (user) => {
      if (user) {
        const getUser = await getUserInfo().then((res) => {
          return res.find(
            (userInfo: { id: any }) => userInfo?.id === user?.uid,
          );
        });
        const customers = await getCustomersUser(user.uid);
        setUserInfo(getUser);
        setCustomers(customers);
      } else {
        console.log('No user logged in');
      }
    });
  }, []);

  return (
    <AppContext>
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            {/*<div>*/}
            {/*  <input*/}
            {/*    type="email"*/}
            {/*    placeholder="Email"*/}
            {/*    value={email}*/}
            {/*    onChange={(e) => setEmail(e.target.value)}*/}
            {/*  />*/}
            {/*  <input*/}
            {/*    type="password"*/}
            {/*    placeholder="Password"*/}
            {/*    value={password}*/}
            {/*    onChange={(e) => setPassword(e.target.value)}*/}
            {/*  />*/}
            {/*  <button onClick={handleLogin}>Login</button>*/}

            {/*</div>*/}
            <NavBar />
            <RouteContainer>
              <div>
                <p>{userInfo?.email}</p>
                <p>{userInfo?.typeOfUser}</p>
              </div>
              <Routes>
                <Route
                  path={'/'}
                  element={<CustomersList data={{ customers, userInfo }} />}
                />
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
  //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
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
