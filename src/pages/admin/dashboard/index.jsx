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
  const dorm = await fetchData('slots');
  const canteen = await fetchData('slots/canteen');
  const summary = await fetchData('slots/summary');

  return { dorm, canteen, summary };
};

function Dashboard() {
  const [dormSlots, setDormSlots] = useState();
  const [canteenSlots, setCanteenSlots] = useState();
  const [summary, setSummary] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  };

  const openDetails = (users) => {
    // Open Modal to show details
    toggleModal();

    // based on id, retrieve the details of the boarders in the room
    console.log(users);
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

      <Modal isOpen={modalIsOpen} close={toggleModal}>
        <button onClick={toggleModal}>Close</button>
      </Modal>
    </>
  );
}

export default Dashboard;
