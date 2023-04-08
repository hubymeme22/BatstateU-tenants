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
  accountInitialState,
} from '../../../services/format/FormState';
import { tenantsLoader } from '../../../services/loaders';
import {
  fetchAsAdmin,
  markAsPaid,
  changeTenantRoom,
} from '../../../services/request';

// hooks
import useFilter from '../../../hooks/useFilter';
import useToggle from '../../../hooks/useToggle';
import useSearch from '../../../hooks/useSearch';
import InfoCard from './components/InfoCard/InfoCard';

function Tenants() {
  const [allTenants, setAllTenants] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

  // Toggles
  const [isLoading, toggleLoading] = useToggle(true);
  const [modalIsOpen, toggleModal] = useToggle(false);
  const [isViewingInfo, toggleViewingInfo] = useToggle(false);

  // Placeholder for modal
  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);

  // For viewing the user info card
  const [userData, setUserData] = useState(accountInitialState);

  // Filters & Search
  const [table, changeTable] = useFilter('');
  const [filterBy, changeFilter] = useFilter('');
  const [searchText, handleSearch] = useSearch();

  // Get list of tenants on first load
  useEffect(() => {
    const fetchRecords = async () => {
      const data = await tenantsLoader();
      setAllTenants(data.records.details);
      setMatchedUsers(data.records.details);
      setAvailableRooms(data.availableRooms.slots);
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    // Guard case
    if (allTenants.length == 0 && filterBy == '' && searchText.trim() == '') {
      setMatchedUsers(allTenants);
      return;
    }

    let accounts = allTenants;

    if (table != '') {
      // filter out based on access type (none / room  / canteen )
      accounts = allTenants.filter((user) => user.room_label == table);
    }

    // filter again by status
    const filtered = filterByStatus(accounts, filterBy);

    // Search the new list
    const result = searchUser(searchText, filtered);

    setMatchedUsers(result);
  }, [allTenants, table, filterBy, searchText]);

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

  const viewTenantInfo = (userData) => {
    setUserData({ accountInitialState });

    toggleViewingInfo();

    setUserData(userData);
  };

  const changeRoom = (e) => {
    const room = e.target.value;
    const updatedAccount = { ...userData, roomID: room };

    setUserData(updatedAccount);
  };

  const saveChanges = (username, roomID) => {
    const updatedTenantList = allTenants.map((tenant) => {
      if (tenant.username == userData.username) {
        return userData;
      }
      return tenant;
    });

    setAllTenants(updatedTenantList);
    const response = changeTenantRoom(username, roomID);
    toggleViewingInfo();
  };

  return (
    <>
      <Container>
        <Header
          table={table}
          changeTable={changeTable}
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
          <p></p>
        </ColumnTitles>

        <hr />

        {!isLoading || allTenants.length != 0 ? (
          <List
            data={matchedUsers}
            viewStatement={viewStatement}
            viewTenantInfo={viewTenantInfo}
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
        handlePayment={handlePayment}
      />

      <InfoCard
        isOpen={isViewingInfo}
        toggleModal={toggleViewingInfo}
        availableRooms={availableRooms}
        userData={userData}
        changeRoom={changeRoom}
        saveChanges={saveChanges}
      />
    </>
  );
}

export default Tenants;
