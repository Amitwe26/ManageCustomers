import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { auth, observeAuthState } from '../../service/loginService';

const TopNavBarUi = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isUserLogin, setIsUserLogin] = useState(true);

  useEffect(() => {
    observeAuthState(async (user) => {
      if (user) setIsUserLogin(true);
      else {
        setIsUserLogin(false);
        navigate('/');
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <NavContainer>
      <NavList>
        <UserContainer>
          <span>{user?.email}</span>
        </UserContainer>
        <NavItem>
          <StyledNavLink to="/newCustomer">
            {t('navBar.addNewCustomer')}
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/customers">
            {t('navBar.customersList')}
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/tasks">{t('navBar.tasks')}</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/calendar">{t('navBar.calendar')}</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/setting">{t('navBar.setting')}</StyledNavLink>
        </NavItem>
        {isUserLogin && (
          <NavItem>
            <StyledNavLink onClick={() => handleLogout()} to="/">
              {t('navBar.logOut')}
            </StyledNavLink>
          </NavItem>
        )}
      </NavList>
    </NavContainer>
  );
};

export default TopNavBarUi;

const NavContainer = styled.nav`
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
  z-index: 5;
  margin-bottom: 6px;
`;

const UserContainer = styled.div`
  width: 100px;
  margin-inline-end: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NavList = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  width: 100%;
`;

const NavItem = styled.li``;

const StyledNavLink = styled(NavLink)`
  color: #494848;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  display: block;
  transition: background-color 0.3s ease;
  border-radius: 4px;
  border-bottom: 3px solid rgba(97, 103, 214, 0);

  &:hover {
    border-bottom: 3px solid rgba(97, 103, 214, 0.5);
  }

  &.active {
    border-bottom: 3px solid rgba(97, 103, 214, 0.99);
    color: rgba(97, 103, 214, 0.99);
  }
`;
