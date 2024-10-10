import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../screens/LoginPage';
import SideNavUi from '../components/NavBarUi/SideNavUi';
import CustomersList from '../screens/CustomersList';
import Calendar from '../screens/Calendar';
import CustomerDetails from '../components/CastumerDetailsUi/CustomerDetails';
import styled from 'styled-components';
import { getUserInfo, observeAuthState } from '../utils/firebase';
import { useAppContext } from '../context/AppContext';
import Setting from '../screens/Setting';

const RoutesComponent = () => {
  const location = useLocation();
  const { setUser } = useAppContext();

  const noSidebarRoutes = ['/', '/signup'];

  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  const navigate = useNavigate();
  useEffect(() => {
    observeAuthState(async (user) => {
      if (user) {
        const getUser = await getUserInfo().then((res) =>
          res.find((userInfo: { id: any }) => userInfo.id === user.uid),
        );
        if (getUser) setUser(getUser);
      } else {
        console.log('No user logged in');
        navigate('/');
      }
    });
  }, [navigate, setUser]);

  return (
    <Container>
      {showSidebar && <SideNavUi />}
      <RouteContainer>
        <Routes>
          <Route path={'/'} element={<LoginPage />} />
          <Route path={'/customers'} element={<CustomersList />} />
          <Route path={'/calendar'} element={<Calendar />} />
          <Route path={'/setting'} element={<Setting />} />
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
  ${({ theme }) => theme.utils.flexDirectionRtl(theme)};
  background-color: ${({ theme }) => theme.colors.backgroundColor.white};
  display: flex;
`;

const RouteContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor.base};
  border-top: 1px solid ${({ theme }) => theme.colors.border.gray};
  margin-top: 25px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
