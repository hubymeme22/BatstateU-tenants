import React, { useEffect, useState } from 'react';

import { ColumnTitles, Container } from './styled';

// components
import Header from './components/Header';
import List from './components/List';
import ModalStatement from './components/Modal/Modal';
import Loader from '../../../components/Loader';

// Utils
import { searchUser } from '../../../utils/search';

import {
  userInitialState,
  billingInitialState,
} from '../../../services/format/FormState';
import { tenantsLoader } from '../../../services/loaders';
import { fetchAsAdmin } from '../../../services/request';

function Tenants() {
  const [allTenants, setAllTenants] = useState([]);
  const [area, setArea] = useState('Tenants');
  const [filter, setFilter] = useState(null);

  // Used for searching
  const [searchText, setSearchText] = useState('');
  const [matchedUsers, setMatchedUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Used for modal
  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);

  // Get list of tenants on first load
  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    if (searchText.trim() == '') {
      setMatchedUsers(allTenants);
      return;
    }

    const matchedUsers = searchUser(searchText, allTenants);
    setMatchedUsers(matchedUsers);
  }, [searchText]);

  const fetchRecords = async () => {
    const data = await tenantsLoader();
    setAllTenants(data.details);
    setMatchedUsers(data.details);
  };

  const changeArea = (area) => {
    setArea(area);
  };

  const filterBy = (status) => {
    setFilter(status);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchText(keyword);
  };

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
      srCode: username,
      details: {
        name: {
          first: first,
          middle: middle,
          last: last,
        },
      },
    });

    setIsLoading(false);
  };

  return (
    <>
      <Container>
        <Header
          area={area}
          changeArea={changeArea}
          filterBy={filterBy}
          searchText={searchText}
          handleSearch={handleSearch}
        />

        <ColumnTitles>
          <p>SR-CODE</p>
          <p>First Name</p>
          <p>Last Name</p>
          <p>Contact</p>
          <p>Unit Number</p>
          <p>Status</p>
        </ColumnTitles>

        <hr />

        {!isLoading || allTenants.length != 0 ? (
          <List
            data={matchedUsers}
            area={area}
            filter={filter}
            viewStatement={viewStatement}
          />
        ) : (
          <Loader />
        )}
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
