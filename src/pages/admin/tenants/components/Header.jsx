import React from 'react';

import {
  FilterContainer,
  InputContainer,
  StyledHeader,
} from '../../../../styles/common/styles';
import { ColumnTitles } from '../styled';

import { FiSearch } from 'react-icons/fi';

function Header(props) {
  const { table, searchText } = props;
  const { changeTable, changeFilter, handleSearch } = props;

  return (
    <StyledHeader>
      <div>
        <h1>
          {table
            ? table.charAt(0).toUpperCase() + table.slice(1)
            : 'All Tenants'}
        </h1>

        <FilterContainer>
          {/* Select table  */}
          <InputContainer>
            <label htmlFor=""> Area: </label>
            <select value={table} onChange={(e) => changeTable(e.target.value)}>
              <option value="">All</option>
              <option value="dorm">Dorm</option>
              <option value="canteen">Canteen</option>
            </select>
          </InputContainer>

          {/* Filter By */}
          <InputContainer>
            <label htmlFor="">Filter By: </label>

            <select onChange={(e) => changeFilter(e.target.value)}>
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
              type="search"
              placeholder="Search tenant"
              value={searchText}
              onChange={(e) => handleSearch(e)}
            />
            <FiSearch />
          </InputContainer>
        </FilterContainer>
      </div>

      <ColumnTitles>
        <p>SR-CODE</p>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Contact</p>
        <p>Unit Number</p>
        <p>Status</p>
        <p></p>
      </ColumnTitles>

      <hr />
    </StyledHeader>
  );
}

export default Header;
