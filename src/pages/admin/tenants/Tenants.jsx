import React, { useEffect, useState } from 'react';

import { tenantsLoader } from '../../../services/loaders';

// components
import Header from './components/Header';
import { Container } from './styled';
import List from './components/List';
import ModalStatement from './components/Modal/Modal';

// Utils
import { userInitialState, billingInitialState } from '@/data/FormState';
import { fetchAsAdmin } from '../../../services/adminFetch';

function Tenants() {
  const [allTenants, setAllTenants] = useState({});
  const [area, setArea] = useState('Tenants');
  const [filter, setFilter] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);

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

  const viewStatement = async (userData) => {
    // Clear modal datas
    setUserInfo(userInitialState);
    setUserBillings(billingInitialState);

    // open modal
    toggleModal();

    // Destruct userdata
    const { username } = userData;
    const { first, middle, last } = userData.name;

    // Retrieve billing report
    const billings = await fetchAsAdmin(`billing/report/${username}`);

    // Set form information
    setUserBillings(billings.data.report);
    setUserInfo({
      ...userInfo,
      details: {
        name: {
          first: first,
          middle: middle,
          last: last,
        },
      },
    });
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

      <ModalStatement
        isOpen={modalIsOpen}
        toggleModal={toggleModal}
        userInfo={userInfo}
        userBillings={userBillings}
      />
    </>
  );
}

export default Tenants;
