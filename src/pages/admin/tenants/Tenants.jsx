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
import { filterByStatus } from '../../../utils/dataFilters';
import { showSuccessToast, showErrorToast } from '../../../utils/toast';
// Services
import { markAsPaid, changeTenantRoom } from '../../../services/request';
import { tenantsLoader } from '../../../services/loaders';

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
  const [isViewingInfo, toggleViewingInfo] = useToggle(false);

  // Placeholder for modal
  const [selectedTenant, setSelectedTenant] = useState(null);
  // Placeholder for infocard
  const [selectedUserData, setSelectedUserData] = useState(null);

  // Filters & Search
  const [table, changeTable] = useFilter('');
  const [filterBy, changeFilter] = useFilter('');
  const [searchText, handleSearch] = useSearch();

  // Get list of tenants on first load
  useEffect(() => {
    const fetchRecords = async () => {
      const data = await tenantsLoader();

      const tenants = data.details;
      setAllTenants(tenants);
      setMatchedUsers(tenants);
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
    // Set as paid on the server / database
    markAsPaid(username);

    // Update locally
    const editedTenantsList = allTenants.map((user) => {
      if (user.username == username) {
        return { ...user, status: 'paid' };
      }
      return user;
    });

    setAllTenants(editedTenantsList);
  };

  const viewStatement = async (userData) => {
    toggleModal(); // open modal
    setSelectedTenant(userData);
  };

  const viewTenantInfo = (userData) => {
    toggleViewingInfo();
    setSelectedUserData(userData);
  };

  const changeRoom = (e) => {
    let value = e.target.value;

    value = value.split('|');

    const room = value[0];
    const label = value[1];

    const updatedAccount = {
      ...selectedUserData,
      roomID: room,
      room_label: label,
    };

    setSelectedUserData(updatedAccount);
  };

  // Save changing room in local and in server
  const saveChanges = async (username, roomID) => {
    const response = await changeTenantRoom(username, roomID);

    // No changes
    if (response.data.error == 'UserAlreadyExists') {
      toggleViewingInfo();
      return;
    }

    // Unsuccessful in changing rooms
    if (!response.data.added) {
      showErrorToast('Something went wrong, Try Again!');
      toggleViewingInfo();
      return;
    }

    // Update local state
    const updatedTenantList = allTenants.map((tenant) => {
      if (tenant.username == selectedUserData.username) {
        return selectedUserData;
      }
      return tenant;
    });

    setAllTenants(updatedTenantList);
    showSuccessToast(`Successfully moved ${username} to ${roomID}`);
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
        selectedTenant={selectedUserData}
        changeRoom={changeRoom}
        saveChanges={saveChanges}
      />
    </>
  );
}

export default Tenants;
