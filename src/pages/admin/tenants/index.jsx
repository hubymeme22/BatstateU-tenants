import React, { useEffect, useState } from 'react';

import fetchData from '../../../utils/fetchData';

// components
import Header from './components/Header';
import { Container } from './styled';
import List from './components/List';

const tenantsLoader = async () => {
  const allRecords = await fetchData('students/details');
  return allRecords.data;
};

function Tenants() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await tenantsLoader();
      setStudents(data.details);
    };

    fetchRecords();
  }, []);

  return (
    <Container>
      <Header />

      <List data={students} />
    </Container>
  );
}

export default Tenants;
