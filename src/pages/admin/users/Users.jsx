import React, { useEffect, useState } from 'react';

import { Container, ColumnTitles } from './styled';

import Header from './components/Header';

import { usersLoader } from '../../../services/loaders';
import { searchUser } from '../../../utils/search';
import UsersList from './components/UsersList';
import Loader from '../../../components/Loader';

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
    if (searchText.trim() == '') {
      setMatchedUsers(users);
      return;
    }

    const matchedUsers = searchUser(searchText, users);
    setMatchedUsers(matchedUsers);
  }, [searchText]);

  const fetchedData = async () => {
    const data = await usersLoader();
    setUsers(data.details);
    setMatchedUsers(data.details);
    setIsLoading(false);
  };

  const changeCategory = (value) => {
    setCategory(value);
  };

  const changeFilter = (value) => {
    setFilterBy(value);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchText(keyword);
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
          <UsersList list={matchedUsers} />
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
}

export default Users;
