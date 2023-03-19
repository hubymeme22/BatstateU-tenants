import React, { useEffect, useState } from 'react';

import fetchData from '../../../utils/fetchData';

const dashboardLoader = () => {
  return fetchData('slots');
};

function Dashboard() {
  const [slots, setSlots] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await dashboardLoader();
      setSlots(response.data.slots);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(slots);
  }, [slots]);

  return <>Dashboard Page</>;
}

export default Dashboard;
