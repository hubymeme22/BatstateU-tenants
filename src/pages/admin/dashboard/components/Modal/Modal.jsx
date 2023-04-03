import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

// Stylings
import { Grid, ModalStyling, StyledModal } from './styled';
import { Header, Details, Users } from './styled';
import { ButtonContainer, Button } from './styled';

// components
import Loader from '@/components/Loader';

// theme
import { theme } from '@/styles/theme';

function Modal({ isOpen, close, data, includeNames, toggleInvoice }) {
  const [checkboxes, setCheckboxes] = useState({});
  const [tenants, setTenants] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [error, setError] = useState(null);

  const toggleCheckbox = (id) => {
    setCheckboxes({
      ...checkboxes,
      [id]: !checkboxes[id],
    });
  };

  const selectAll = (e) => {
    const isChecked = e.target.checked;
    const newCheckboxes = {};

    Object.keys(checkboxes).forEach((id) => {
      newCheckboxes[id] = isChecked;
    });

    setCheckboxes(newCheckboxes);
  };

  const createInvoice = () => {
    if (selectedTenants.length <= 0) {
      setError('* Please select a student *');
      return;
    }

    console.log(selectedTenants);

    includeNames(selectedTenants);
    close(); //close modal
    toggleInvoice(); // open invoice tab
  };

  // Set default tenants
  useEffect(() => {
    if (!data) return;

    setTenants(data.userinfo);

    // Generate an object for checkbox reference
    const usernames = data.userinfo.map((data) => data.username);

    const usernameObj = {};
    usernames.forEach((username) => {
      usernameObj[username] = false;
    });

    setCheckboxes(usernameObj);
  }, [data]);

  useEffect(() => {
    // Set selected tenants based on the checkboxes
    const newSelected = tenants
      .map((tenant) => {
        if (!checkboxes[tenant.username]) return null;
        return tenant;
      })
      .filter((value) => value !== null);

    setSelectedTenants(newSelected);
    setError(null);
  }, [checkboxes]);

  return (
    <StyledModal isOpen={isOpen} onRequestClose={close} style={ModalStyling}>
      {!data ? (
        <Loader />
      ) : (
        <>
          <section>
            <Header>
              <p>Room: {data ? data.slot : null}</p>

              <p>
                Number of Tenants:
                {data ? <span> {data.userinfo.length} / 4 </span> : null}
              </p>
            </Header>

            <hr />

            {/* COLUMNS */}
            <Grid>
              <input type="checkbox" onChange={(e) => selectAll(e)} />
              <p>SR-CODE</p>
              <p>Name</p>
              <p>Contact Number</p>
              <p>Status</p>
            </Grid>

            <hr />

            {/* Map Users */}
            <Users>
              {data &&
                data.userinfo.map((user) => {
                  //  Destruct details
                  let { username, name, contact, status } = user;
                  name = `${name.first} ${name.last}`;

                  return (
                    <React.Fragment key={username}>
                      <Details>
                        <input
                          type="checkbox"
                          checked={checkboxes[username] || false}
                          onChange={() => toggleCheckbox(username)}
                        />
                        <p>{username}</p>
                        <p>{name}</p>
                        <p>{contact}</p>
                        <p>{status}</p>
                      </Details>

                      <hr />
                    </React.Fragment>
                  );
                })}
            </Users>
          </section>

          <ButtonContainer>
            {/* Error */}
            <p>{error}</p>

            <div>
              <Button color={'#777777'} onClick={close}>
                Cancel
              </Button>

              <Button color={theme.red} onClick={createInvoice}>
                Create Invoice
              </Button>
            </div>
          </ButtonContainer>
        </>
      )}
    </StyledModal>
  );
}

export default Modal;
