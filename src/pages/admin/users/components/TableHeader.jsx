import React from 'react';
import { AdminColumn, UserColumn } from '../styled';

function TableHeader({ table }) {
  return (
    <>
      {table == 'student' ? (
        <UserColumn>
          <p>SR-CODE</p>
          <p>First Name</p>
          <p>Last Name</p>
          <p>Contact</p>
          <p>Verified</p>
          <p>Unit Number</p>
        </UserColumn>
      ) : (
        <AdminColumn>
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email</p>
        </AdminColumn>
      )}

      <hr />
    </>
  );
}

export default TableHeader;
