import React, { useEffect, useState } from 'react';

import { tenantsLoader } from '../../../services/loaders';

// components
import Header from './components/Header';
import { Container } from './styled';
import List from './components/List';

function Tenants() {
  const [allTenants, setAllTenants] = useState([]);
  const [area, setArea] = useState('Tenants');
  const [filter, setFilter] = useState(null);

  const changeArea = (area) => {
    setArea(area);
  };

  const filterBy = (status) => {
    setFilter(status);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await tenantsLoader();
      setAllTenants(data.details);
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    // console.log(allTenants);
  }, [allTenants]);

  return (
    <Container>
      <Header area={area} changeArea={changeArea} filterBy={filterBy} />
      <List data={allTenants} area={area} filter={filter} />
    </Container>
  );
}

export default Tenants;
