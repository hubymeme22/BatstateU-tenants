import React, { useEffect, useState } from 'react';

import { Container } from './styled';

import Header from './components/Header';
import TableHeader from './components/TableHeader';
import UsersList from './components/UsersList';
import Loader from '../../../components/Loader';

// Http request
import { usersLoader } from '../../../services/loaders';
import { filterByVerificationStatus } from '../../../utils/filter';
import { unverifyStudent } from '../../../services/request';
import { verifyStudent } from '../../../services/request';

import { searchUser } from '../../../utils/search';

// custom hooks
import useSearch from '../../../hooks/useSearch';
import useFilter from '../../../hooks/useFilter';

function Users() {
  const [allAcounts, setAllAccounts] = useState([]);
  const [isLoading, toggleLoading] = useState(true);
  const [matchedUsers, setMatchedUsers] = useState([]);

  // Filters & Search
  const [table, changeTable] = useFilter('student');
  const [filterBy, changeFilter] = useFilter('');
  const [searchText, handleSearch] = useSearch();

  // Fetch Users
  useEffect(() => {
    const fetchedData = async () => {
      const data = await usersLoader();
      setAllAccounts(data.details);
      setMatchedUsers(data.details);
      toggleLoading(false);
    };

    fetchedData();
  }, []);

  useEffect(() => {
    // Guard case
    if (allAcounts.length == 0 && filterBy == '' && searchText.trim() == '') {
      setMatchedUsers(allAcounts);
      return;
    }

    // filter out based on access type (admin / student)
    const accounts = allAcounts.filter((user) => user.access == table);

    // filter again by verification status
    const filtered = filterByVerificationStatus(accounts, filterBy);

    // Search from the filtered list
    const result = searchUser(searchText, filtered);

    setMatchedUsers(result);
  }, [allAcounts, table, filterBy, searchText]);

  //
  const toggleVerification = (username, isVerified) => {
    const editedUsersList = allAcounts.map((user) => {
      if (user.username == username) {
        return { ...user, verified: !isVerified };
      }
      return user;
    });

    // Edit verification status on server / database
    if (isVerified) {
      unverifyStudent(username);
    } else {
      verifyStudent(username);
    }

    // Edit value on browser for fast render
    setAllAccounts(editedUsersList);
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
        ></Header>

        <TableHeader table={table} />

        {!isLoading || allAcounts.length != 0 ? (
          <UsersList
            list={matchedUsers}
            toggleVerification={toggleVerification}
            type={table}
          />
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
}

export default Users;
