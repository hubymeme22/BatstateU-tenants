import React from 'react';

import {
  FilterContainer,
  InputContainer,
  StyledHeader,
} from '../../../../styles/common/styles';

import TableHeader from './TableHeader';
import { FiSearch } from 'react-icons/fi';

function Header(props) {
  const { table, searchText } = props;
  const { changeTable, changeFilter, handleSearch } = props;

  return (
    <StyledHeader>
      <div>
        <h1>{table.charAt(0).toUpperCase() + table.slice(1)} table</h1>

        <FilterContainer>
          {/* Table */}
          <InputContainer>
            <label htmlFor=""> Area: </label>
            <select value={table} onChange={(e) => changeTable(e.target.value)}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </InputContainer>

          {/* Filter by */}
          {table != 'admin' && (
            <InputContainer>
              <label htmlFor="">Filter By: </label>

              <select onChange={(e) => changeFilter(e.target.value)}>
                <option value="" defaultValue>
                  None
                </option>
                <option value="verified">Verified</option>
                <option value="unverified"> Unverified</option>
              </select>
            </InputContainer>
          )}

          {/* Search Bar */}
          <InputContainer>
            <input
              type="search"
              placeholder="search"
              value={searchText}
              onChange={(e) => handleSearch(e)}
            />
            <FiSearch />
          </InputContainer>
        </FilterContainer>
      </div>

      <TableHeader table={table} />
    </StyledHeader>
  );
}

export default Header;
