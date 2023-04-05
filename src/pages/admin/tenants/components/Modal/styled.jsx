import ReactModal from 'react-modal';
import styled from 'styled-components';

export const ModalStyling = {
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000ba',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '800px',
  },
};

export const StyledModalStatement = styled(ReactModal)`
  padding: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  outline: 0;
`;

export const Button = styled.button`
  color: green;
`;

export const Watermark = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-40deg);
  opacity: 0.25;
  font-size: 150px;
  font-weight: bold;
  pointer-events: none;

  &::before {
    content: 'PAID';
  }
`;
