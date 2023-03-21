import React, { useEffect, useState } from 'react';

import fetchData from '@/utils/fetchData';
import Loader from '@/components/Loader';

// Components
import Dorm from './components/Dorm';
import Canteen from './components/Canteen';
import Summary from './components/Summary';

// Styled-Components
import { Layout } from './styled';

const dashboardLoader = async () => {
  const dorm = await fetchData('slots');
  const canteen = await fetchData('slots/canteen');
  const summary = await fetchData('slots/summary');

  return { dorm, canteen, summary };
};

function Dashboard() {
  const [dormSlots, setDormSlots] = useState();
  const [canteenSlots, setCanteenSlots] = useState();
  const [summary, setSummary] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await dashboardLoader();
      setDormSlots(response.dorm.data.slots);
      setCanteenSlots(response.canteen.data.slots);
      setSummary(response.summary.data);
    };

    fetchData();
  }, []);

  const retrieveBoarders = (id) => {};

  return (
    <>
      {dormSlots ? (
        <Layout>
          <Dorm data={dormSlots} />
          <Canteen data={canteenSlots} />
          <Summary data={summary} />
        </Layout>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Dashboard;
