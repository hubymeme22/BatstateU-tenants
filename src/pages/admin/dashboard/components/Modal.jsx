import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

function Modal({ children, isOpen, close }) {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={close} style={ModalStyling}>
      {children}
    </ReactModal>
  );
}

export default Modal;

const ModalStyling = {
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
