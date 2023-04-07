import React, { useEffect, useState } from 'react';

import { Container, ColumnTitles } from './styled';

import Header from './components/Header';

import { usersLoader } from '../../../services/loaders';
import { searchUser } from '../../../utils/search';
import UsersList from './components/UsersList';
import Loader from '../../../components/Loader';

import { filterByVerificationStatus } from '../../../utils/filter';
import { unverifyStudent } from '../../../services/request';
import { verifyStudent } from '../../../services/request';

function Users() {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState('student');
  const [filterBy, setFilterBy] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  //
  const [searchText, setSearchText] = useState('');
  const [matchedUsers, setMatchedUsers] = useState([]);

  // Fetch Users
  useEffect(() => {
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

  const fetchedData = async () => {
    const data = await usersLoader();
    setUsers(data.details);
    setMatchedUsers(data.details);
    setIsLoading(false);
  };

  // Functions to change the category / filter / search
  const changeCategory = (value) => {
    setCategory(value);
  };

  const changeFilter = (value) => {
    setFilterBy(value);
    setMatchedUsers(matchedUsers);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchText(keyword);
  };

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
            filterBy={filterBy}
          />
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
}

export default Users;
