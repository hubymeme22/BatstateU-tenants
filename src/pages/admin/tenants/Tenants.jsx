import React, { useEffect, useState } from 'react';

import { tenantsLoader } from '../../../services/loaders';

// components
import Header from './components/Header';
import { Container } from './styled';
import List from './components/List';
import ModalStatement from './components/Modal/Modal';

function Tenants() {
  const [allTenants, setAllTenants] = useState({});
  const [area, setArea] = useState('Tenants');
  const [filter, setFilter] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const changeArea = (area) => {
    setArea(area);
  };

  const filterBy = (status) => {
    setFilter(status);
  };

  // Get list of tenants on first load
  useEffect(() => {
    const fetchRecords = async () => {
      const data = await tenantsLoader();
      setAllTenants(data.details);
    };

    fetchRecords();
  }, []);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const viewStatement = (username) => {
    //
    toggleModal();
  };

  return (
    <>
      <Container>
        <Header area={area} changeArea={changeArea} filterBy={filterBy} />
        <List
          data={allTenants}
          area={area}
          filter={filter}
          viewStatement={viewStatement}
        />
      </Container>

      <ModalStatement isOpen={modalIsOpen} toggleModal={toggleModal} />
    </>
  );
}

export default Tenants;
