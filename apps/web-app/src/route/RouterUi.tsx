import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../screens/LoginPage';
import TopNavBarUi from '../components/NavBarUi/TopNavBarUi';
import CustomersList from '../screens/CustomersList';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Setting from '../screens/Setting';
import { getUserInfo } from '../service/userService';
import { observeAuthState } from '../service/loginService';
import CalendarUiScreen from '../screens/CalendarUiScreen';
import TasksScreen from '../screens/TasksScreen';
import NewCustomerScreen from '../screens/NewCustomerScreen';

const RoutesComponent = () => {
  const location = useLocation();
  const { setUser } = useAppContext();
  const noSidebarRoutes = ['/', '/signup'];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    observeAuthState(async (user) => {
      if (user) {
        const getUser = await getUserInfo(user.uid);
        if (getUser) setUser(getUser);
      } else {
        console.log('No user logged in');
        navigate('/');
      }
    });
  }, [setUser]);

  return (
    <Container>
      <RouteContainer>
        {showSidebar && <TopNavBarUi />}
        <Routes>
          <Route path={'/'} element={<LoginPage />} />
          <Route path={'/newCustomer'} element={<NewCustomerScreen />} />
          <Route path={'/tasks'} element={<TasksScreen />} />
          <Route path={'/customers'} element={<CustomersList />} />
          <Route path={'/calendar'} element={<CalendarUiScreen />} />
          <Route path={'/setting'} element={<Setting />} />
        </Routes>
      </RouteContainer>
    </Container>
  );
};

export default RoutesComponent;

const Container = styled.div`
  ${({ theme }) => theme.utils.flexDirectionRtl(theme)};
  background-color: ${({ theme }) => theme.colors.backgroundColor.base};
  display: flex;
  overflow-y: hidden;
  height: 100vh;
`;

const RouteContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor.white};
  border-top: 1px solid ${({ theme }) => theme.colors.border.gray};
  margin-top: 15px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
