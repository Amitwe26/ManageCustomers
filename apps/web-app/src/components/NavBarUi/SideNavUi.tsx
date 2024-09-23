import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SideNavUi = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <StyledNavLink to="/">Customers List</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/calendar">Calendar</StyledNavLink>
        </NavItem>
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
  height: 100vh;
  padding-top: 20px;
  display: flex;
  justify-content: start;
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
    background-color: rgb(242, 249, 252, 0.9);
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
`;
