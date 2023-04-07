import React from 'react';

import { InputContainer, StyledHeader } from '../styled';

import { FiFilter, FiSearch } from 'react-icons/fi';

function Header(props) {
  const { area, searchText } = props;
  const { changeArea, changeFilter, handleSearch } = props;

  return (
    <StyledHeader>
      <h1>{area ? area : 'All Tenants'}</h1>

      <div>
        {/* Select Area  */}
        <InputContainer>
          <label htmlFor=""> Area: </label>
          <select
            name=""
            id=""
            value={area}
            onChange={(e) => changeArea(e.target.value)}
          >
            <option value="">All</option>
            <option value="Dormitory">Dorm</option>
            <option value="Canteen">Canteen</option>
          </select>
        </InputContainer>

        {/* Filter By */}
        <InputContainer>
          <label htmlFor="">Filter By: </label>

          <select name="" id="" onChange={(e) => changeFilter(e.target.value)}>
            <option value="" defaultValue>
              None
            </option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </InputContainer>

        {/* Search Bar */}
        <InputContainer>
          <input
            type="text"
            placeholder="Search tenant"
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
