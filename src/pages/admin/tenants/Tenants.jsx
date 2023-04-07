import React, { useEffect, useState } from 'react';

import { ColumnTitles, Container } from './styled';

// components
import Header from './components/Header';
import List from './components/List';
import ModalStatement from './components/Modal/Modal';
import Loader from '../../../components/Loader';

// Utils
import { searchUser } from '../../../utils/search';
import { filterByStatus } from '../../../utils/filter';

// Services
import {
  userInitialState,
  billingInitialState,
} from '../../../services/format/FormState';
import { tenantsLoader } from '../../../services/loaders';
import { fetchAsAdmin, markAsPaid } from '../../../services/request';

// hooks
import useFilter from '../../../hooks/useFilter';
import useToggle from '../../../hooks/useToggle';
import useSearch from '../../../hooks/useSearch';

function Tenants() {
  const [allTenants, setAllTenants] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

  // Toggles
  const [isLoading, toggleLoading] = useToggle(true);
  const [modalIsOpen, toggleModal] = useToggle(false);

  // Placeholder for modal
  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);

  // Filters & Search
  const [area, changeArea] = useFilter('Tenants');
  const [filterBy, changeFilter] = useFilter('');
  const [searchText, handleSearch] = useSearch();

  // Get list of tenants on first load
  useEffect(() => {
    const fetchRecords = async () => {
      const data = await tenantsLoader();
      setAllTenants(data.details);
      setMatchedUsers(data.details);
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    // Guard case
    if (allTenants.length == 0 && filterBy == '' && searchText.trim() == '') {
      setMatchedUsers(allTenants);
      return;
    }

    // filter the users by verification status
    const filtered = filterByStatus(allTenants, filterBy);

    // Search the new list
    const result = searchUser(searchText, filtered);

    setMatchedUsers(result);
  }, [allTenants, searchText, filterBy]);

  useEffect(() => {
    if (searchText.trim() == '') {
      setMatchedUsers(allTenants);
      return;
    }

    const matchedUsers = searchUser(searchText, allTenants);
    setMatchedUsers(matchedUsers);
  }, [searchText]);

  const handlePayment = (username) => {
    const editedTenantsList = allTenants.map((user) => {
      if (user.username == username) {
        return { ...user, status: 'paid' };
      }
      return user;
    });

    // Set as paid on the server / database
    markAsPaid(username);

    setAllTenants(editedTenantsList);
    setUserBillings({ ...userBillings, isPaid: true });
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

    toggleLoading();
  };

  return (
    <>
      <Container>
        <Header
          area={area}
          changeArea={changeArea}
          changeFilter={changeFilter}
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
          <List data={matchedUsers} viewStatement={viewStatement} />
        ) : (
          <Loader />
        )}
      </Container>

      <ModalStatement
        isOpen={modalIsOpen}
        toggleModal={toggleModal}
        userInfo={userInfo}
        userBillings={userBillings}
        handlePayment={handlePayment}
      />
    </>
  );
}

export default Tenants;
