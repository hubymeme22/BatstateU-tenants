import styled from 'styled-components';
import { NavLink as NavLinks } from 'react-router-dom';

export const StyledSidebar = styled.aside`
  color: white;
  width: min(100%, 350px);
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px;

  padding: 2rem 0 4rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }
`;

export const Title = styled.h1`
  font-family: 'Staatliches';
  font-size: clamp(0.8rem, 7.5vw, 1.35rem);
  text-align: center;
`;

export const LineBreak = styled.hr`
  border-color: ${({ theme }) => theme.gray};
  width: 100%;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavLink = styled(NavLinks)`
  font-size: 1.15rem;
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 15px;

  &.active {
    background: white;
    color: black;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  border: 0;
  color: white;

  font-size: 1.1rem;

  &:hover {
    text-decoration: underline;
  }
`;
