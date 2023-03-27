import React from 'react';

import { InputContainer, StyledHeader } from '../styled';

import { FiFilter, FiSearch } from 'react-icons/fi';

function Header() {
  return (
    <StyledHeader>
      <h1>Dormitory</h1>

      <InputContainer>
        <label htmlFor=""> Area: </label>
        <select name="" id="">
          <option value="" defaultValue>
            Dorm
          </option>
          <option value="">Canteen</option>
        </select>
      </InputContainer>

      <InputContainer>
        <label htmlFor="">Filter By: </label>

        <select name="" id="" placeholder="filter by">
          <option value="" defaultValue>
            None
          </option>
          <option value="">Paid</option>
          <option value="">Unpaid</option>
        </select>
      </InputContainer>

      <InputContainer>
        <input type="text" placeholder="search" /> {/* Search bar */}
        <FiSearch />
      </InputContainer>
    </StyledHeader>
  );
}

export default Header;
