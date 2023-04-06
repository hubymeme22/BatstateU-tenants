import React from 'react';

import { InputContainer, StyledHeader } from '../styled';

import { FiFilter, FiSearch } from 'react-icons/fi';

function Header(props) {
  const { category, searchText } = props;
  const { changeCategory, changeFilter, handleSearch } = props;

  return (
    <StyledHeader>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} table</h1>

      <div>
        {/* Table */}
        <InputContainer>
          <label htmlFor=""> Table: </label>
          <select
            name=""
            id=""
            value={category}
            onChange={(e) => changeCategory(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </InputContainer>

        {/* Filter by */}
        <InputContainer>
          <label htmlFor="">Filter By: </label>

          <select name="" id="" onChange={(e) => changeFilter(e.target.value)}>
            <option value="" defaultValue>
              None
            </option>
            <option value="verified">Verified</option>
            <option value="unveried"> Unverified</option>
          </select>
        </InputContainer>

        {/* Search Bar */}
        <InputContainer>
          <input
            type="text"
            placeholder="search"
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />
          <FiSearch />
        </InputContainer>
      </div>
    </StyledHeader>
  );
}

export default Header;
