import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

// Stylings
import { Grid, ModalStyling, StyledModal } from './styled';
import { Header, Details, Users } from './styled';
import { ButtonContainer, Button } from './styled';

// theme
import { theme } from '@/styles/theme';

function Modal({ isOpen, close, data }) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {}, []);

  const selectAll = (e) => {};

  const toggleUser = (e, user) => {
    if (e.target.checked) {
      // Include User to the selected list
      setSelectedUsers([...selectedUsers, user]);
    } else {
      // Remove user if already checked
      const filteredUsers = selectedUsers.filter((id) => id != user);
      setSelectedUsers(filteredUsers);
    }
  };

  const createInvoice = () => {
    console.log(selectedUsers);
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={close} style={ModalStyling}>
      <section>
        <Header>
          <p>Room Number: {data ? data.slot : null}</p>
          <p>
            Number of Tenants:
            {data ? (
              <span>{`${data.users.length} / ${data.max_slot}`}</span>
            ) : null}
          </p>
        </Header>

        <hr />

        {/* COLUMNS */}
        <Grid>
          <input type="checkbox" name="" id="" onChange={(e) => selectAll(e)} />
          <p>SR-CODE</p>
          <p>Name</p>
          <p>Contact Number</p>
          <p>Status</p>
        </Grid>

        <hr />

        {/* Map Users */}
        <Users>
          {data &&
            data.users.map((user, index) => {
              return (
                <React.Fragment key={index}>
                  <Details>
                    <input
                      type="checkbox"
                      name=""
                      // checked={}
                      // onChange={(e) => toggleUser(e, user)}
                    />
                    <p>{user}</p>
                    <p>Name</p>
                    <p>Contact</p>
                    <p>Status</p>
                  </Details>

                  <hr />
                </React.Fragment>
              );
            })}
        </Users>
      </section>

      <ButtonContainer>
        <Button color={'#777777'} onClick={close}>
          Cancel
        </Button>
        <Button color={theme.red} onClick={createInvoice}>
          Create Invoice
        </Button>
      </ButtonContainer>
    </StyledModal>
  );
}

export default Modal;
