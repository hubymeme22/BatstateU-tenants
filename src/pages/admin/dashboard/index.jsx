import React, { useEffect, useState } from 'react';

import fetchData from '@/utils/fetchData';
import Loader from '@/components/Loader';

// Components
import Dorm from './components/Dorm';
import Canteen from './components/Canteen';
import Summary from './components/Summary';

// Styled-Components
import { Layout } from './styled';
import Modal from './components/Modal';

const dashboardLoader = async () => {
  const dorm = await fetchData('slots/dorm');
  const canteen = await fetchData('slots/canteen');
  const summary = await fetchData('slots/summary');

  return { dorm, canteen, summary };
};

function Dashboard() {
  const [dormSlots, setDormSlots] = useState();
  const [canteenSlots, setCanteenSlots] = useState();
  const [summary, setSummary] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dashboardLoader();
      setDormSlots(response.dorm.data.slots);
      setCanteenSlots(response.canteen.data.slots);
      setSummary(response.summary.data);
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
    setData(null);
  };

  const openDetails = (slotData) => {
    // Open Modal to show details
    toggleModal();

    // fetch user data based on SRCODE / ID

    setData(slotData);
  };

  return (
    <>
      {dormSlots ? (
        <Layout>
          <Dorm data={dormSlots} openDetails={openDetails} />
          <Canteen data={canteenSlots} />
          <Summary data={summary} />
        </Layout>
      ) : (
        <Loader />
      )}

      <Modal isOpen={modalIsOpen} close={toggleModal} data={data} />
    </>
  );
}

export default Dashboard;
