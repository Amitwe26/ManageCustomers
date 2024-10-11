import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth, observeAuthState } from '../../utils/firebase';
import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';

const SideNavUi = () => {
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
        <NavItem>
          <span>{user?.email}</span>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/customers">
            {t('navBar.customersList')}
          </StyledNavLink>
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

export default SideNavUi;

const NavContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  top: 0;
  left: 0;
  width: 200px;
  //height: 100vh;
  padding-top: 20px;
  display: flex;
  justify-content: start;
  overflow: hidden;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 20px 0 0;
  width: 100%;
`;

const NavItem = styled.li`
  padding: 10px 0;
`;

const StyledNavLink = styled(NavLink)`
  color: rgba(175, 175, 175);
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  display: block;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(234, 234, 234);
  }

  &.active {
    background-color: rgba(249, 251, 253);
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
`;
