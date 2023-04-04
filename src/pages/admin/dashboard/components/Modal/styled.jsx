import ReactModal from 'react-modal';
import styled from 'styled-components';

export const ModalStyling = {
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000ba',
  },
  content: {
    width: '800px',
    height: '400px',

    // Centering the modal
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const StyledModal = styled(ReactModal)`
  padding: 0.75rem 0 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  outline: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 0.5rem 1.8rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(4, 1fr);
  justify-items: center;
  font-weight: bold;
  padding: 0.5rem;
`;

export const Details = styled(Grid)`
  font-weight: normal;
  font-size: clamp(10px, 1rem, 15px);
  align-self: center;
  cursor: pointer;
`;

export const Users = styled.div`
  hr {
    margin: 0 auto;
    width: 95%;
  }
`;

export const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 50%;

  p {
    font-size: 0.89rem;
    align-self: end;
    color: red;
  }

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const Button = styled.button`
  height: 3rem;
  background-color: ${(props) => props.color};
  color: white;
  padding: 0.5rem 2rem;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
`;
