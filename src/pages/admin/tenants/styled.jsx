import styled from 'styled-components';

export const ColumnTitles = styled.div`
  font-weight: bold;
  display: grid;
  grid-template-columns: 150px repeat(5, 1fr) 50px;
  padding: 0.5rem;

  & > p:nth-child(4),
  & > p:nth-child(5),
  & > p:nth-child(6) {
    justify-self: center;
  }
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserDetails = styled(ColumnTitles)`
  grid-template-columns: 150px repeat(5, 1fr);
  font-weight: normal;
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
`;

export const Status = styled.p`
  font-weight: bold;
  color: ${({ indicator }) => {
    if (indicator == 'paid') {
      return '#00DF24';
    } else if (indicator == 'unpaid') {
      return '#C52D2D';
    } else {
      return '#777';
    }
  }};
`;

export const Room = styled.p`
  color: ${({ room }) => (room.includes('GN') ? '#999999' : null)};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
