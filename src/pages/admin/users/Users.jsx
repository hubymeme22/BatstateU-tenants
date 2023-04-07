import React, { useEffect, useState } from 'react';

import { Container, ColumnTitles } from './styled';

import Header from './components/Header';
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
  const [users, setUsers] = useState([]);
  const [isLoading, toggleLoading] = useState(true);
  const [matchedUsers, setMatchedUsers] = useState([]);

  // Filters & Search
  const [category, changeCategory] = useFilter('student');
  const [filterBy, changeFilter] = useFilter('');
  const [searchText, handleSearch] = useSearch();

  // Fetch Users
  useEffect(() => {
    const fetchedData = async () => {
      const data = await usersLoader();
      setUsers(data.details);
      setMatchedUsers(data.details);
      toggleLoading(false);
    };

    fetchedData();
  }, []);

  useEffect(() => {
    // Guard case
    if (users.length == 0 && filterBy == '' && searchText.trim() == '') {
      setMatchedUsers(users);
      return;
    }

    // filter the users by verification status
    const filtered = filterByVerificationStatus(users, filterBy);

    // Search the new list
    const result = searchUser(searchText, filtered);

    setMatchedUsers(result);
  }, [users, searchText, filterBy]);

  //
  const toggleVerification = (username, isVerified) => {
    const editedUsersList = users.map((user) => {
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
    setUsers(editedUsersList);
  };

  return (
    <>
      <Container>
        <Header
          category={category}
          changeCategory={changeCategory}
          changeFilter={changeFilter}
          searchText={searchText}
          handleSearch={handleSearch}
        ></Header>

        <ColumnTitles>
          <p>SR-CODE</p>
          <p>First Name</p>
          <p>Last Name</p>
          <p>Contact</p>
          <p>Verified</p>
          <p>Unit Number</p>
        </ColumnTitles>

        <hr />

        {!isLoading || users.length != 0 ? (
          <UsersList
            list={matchedUsers}
            toggleVerification={toggleVerification}
          />
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
}

export default Users;
