import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPageUi from '../components/LoginPageUi/LoginPageUi';
import SideNavUi from '../components/NavBarUi/SideNavUi';
import CustomersList from '../screens/CustomersList';
import Calendar from '../screens/Calendar';
import CustomerDetails from '../components/CastumerDetailsUi/CustomerDetails';
import styled from 'styled-components';

const RoutesComponent = () => {
  const location = useLocation();

  const noSidebarRoutes = ['/', '/signup'];

  const showSidebar = !noSidebarRoutes.includes(location.pathname);
  console.log(location.pathname);
  return (
    //   <NavBar />
    <Container>
      {showSidebar && <SideNavUi />}
      <RouteContainer>
        <Routes>
          <Route path={'/'} element={<LoginPageUi />} />
          <Route path={'/customers'} element={<CustomersList />} />
          <Route path={'/calendar'} element={<Calendar />} />
          <Route
            path={'/customers/customer/:id'}
            element={<CustomerDetails />}
          />
        </Routes>
      </RouteContainer>
    </Container>
  );
};

export default RoutesComponent;
const Container = styled.div`
  display: flex;
  background-color: white;
`;

const RouteContainer = styled.div`
  background-color: rgba(242, 249, 251, 0.5);
  border-top: 1px solid rgba(243, 243, 243, 0.71);
  margin-top: 25px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
