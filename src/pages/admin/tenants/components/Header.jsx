import React from 'react';

import { InputContainer, StyledHeader } from '../styled';

import { FiFilter, FiSearch } from 'react-icons/fi';

function Header({ area, changeArea, filterBy }) {
  return (
    <StyledHeader>
      <h1>{area}</h1>

      <div>
        <InputContainer>
          <label htmlFor=""> Area: </label>
          <select
            name=""
            id=""
            value={area}
            onChange={(e) => changeArea(e.target.value)}
          >
            <option value="Tenants">All</option>
            <option value="Dormitory">Dorm</option>
            <option value="Canteen">Canteen</option>
          </select>
        </InputContainer>

        <InputContainer>
          <label htmlFor="">Filter By: </label>

          <select name="" id="" onChange={(e) => filterBy(e.target.value)}>
            <option value="null" defaultValue>
              None
            </option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </InputContainer>

        <InputContainer>
          <input type="text" placeholder="search" />
          <FiSearch />
        </InputContainer>
      </div>
    </StyledHeader>
  );
}

export default Header;
