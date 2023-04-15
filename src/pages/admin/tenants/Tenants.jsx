import React, { useEffect, useState } from 'react';

import { Container } from './styled';

// components
import Header from './components/Header';
import List from './components/List';
import Loader from '../../../components/Loader';
import ModalStatement from './components/Modal/Modal';
import InfoCard from './components/InfoCard/InfoCard';

// Utils
import { searchUser } from '../../../utils/search';
import { filterByStatus, sortByRoomNames } from '../../../utils/dataFilters';

// Services
import {
  userInitialState,
  billingInitialState,
  accountInitialState,
} from '../../../services/format/FormState';
import {
  fetchAsAdmin,
  markAsPaid,
  changeTenantRoom,
  getUserLogs,
} from '../../../services/request';
import { tenantsLoader } from '../../../services/loaders';

// hooks
import useFilter from '../../../hooks/useFilter';
import useToggle from '../../../hooks/useToggle';
import useSearch from '../../../hooks/useSearch';

function Tenants() {
  const [allTenants, setAllTenants] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

  // Toggles
  const [isLoading, toggleLoading] = useToggle(true);
  const [modalIsOpen, toggleModal] = useToggle(false);
  const [isViewingInfo, toggleViewingInfo] = useToggle(false);

  // Placeholder for modal
  const [selectedTenant, setSelectedTenant] = useState(null);

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

      const tenants = data.records.details;
      const available = sortByRoomNames(data.availableRooms.slots);

      setAllTenants(tenants);
      setMatchedUsers(tenants);
      setAvailableRooms(available);
      toggleLoading();
    };

    fetchRecords();
  }, []);

  // Rerender lists based on the dependencies
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
  };

  const viewStatement = async (userData) => {
    toggleModal(); // open modal
    setSelectedTenant(userData);
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

  // Save changing room in local and in server
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
      <Container id="tenants-page">
        <Header
          table={table}
          changeTable={changeTable}
          changeFilter={changeFilter}
          searchText={searchText}
          handleSearch={handleSearch}
        />

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
        selectedTenant={selectedTenant}
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
