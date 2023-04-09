import styled from 'styled-components';

export const UserColumn = styled.div`
  background-color: white;
  position: sticky;
  top: 0;
  font-weight: bold;
  display: grid;
  grid-template-columns: 150px repeat(5, 1fr);
  padding: 0.5rem 0;

  & > p:first-child {
    justify-content: start;
  }

  & > p:nth-child(4),
  & > p:nth-child(5),
  & > p:nth-child(6) {
    justify-self: center;
  }
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const UserDetails = styled(UserColumn)`
  position: static;
  font-weight: normal;
  border-radius: 5px;
  /* padding: 0.5rem; */

  &:hover {
    background-color: #b5d7ff;
  }
`;

export const AdminColumn = styled.div`
  background-color: white;
  position: sticky;
  top: 0;

  font-weight: bold;
  display: grid;
  grid-template-columns: 250px 200px 1fr;
  padding: 0.5rem;
`;

export const AdminDetails = styled(AdminColumn)`
  font-weight: normal;
  border-radius: 5px;
  padding: 0.5rem;

  &:hover {
    background-color: #b5d7ff;
  }
`;

export const Status = styled.p`
  font-weight: bold;
  color: ${(props) => (props.verified == true ? '#00DF24' : '#C52D2D')};
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
