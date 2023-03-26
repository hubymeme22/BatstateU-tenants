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
  const slots = await fetchData('slots');
  const summary = await fetchData('slots/summary');

  return { slots, summary };
};

function Dashboard() {
  const [allRooms, setAllRooms] = useState([]);
  const [dormData, setDormData] = useState();
  const [canteenData, setCanteenData] = useState();

  const [summary, setSummary] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dashboardLoader();

      const all = await response.slots.data.slots;

      setAllRooms(all);
      setSummary(response.summary.data);
    };

    fetchData();
  }, []);

  // Separate the data after the allRooms are set
  useEffect(() => {
    if (allRooms.length <= 0) return;

    const dorm = allRooms.filter((slots) => slots.label === 'dorm');
    const canteen = allRooms.filter((slots) => slots.label === 'canteen');

    setDormData(dorm);
    setCanteenData(canteen);
  }, [allRooms]);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
    setModalData(null);
  };

  const openDetails = (roomId) => {
    // Open Modal to show details
    toggleModal();

    const roomDetails = dormData.filter((room) => room._id === roomId);
    setModalData(roomDetails[0]);
  };

  return (
    <>
      {allRooms && dormData && canteenData && summary ? (
        <Layout>
          <Dorm data={dormData} openDetails={openDetails} />
          <Canteen data={canteenData} openDetails={openDetails} />
          <Summary data={summary} />
        </Layout>
      ) : (
        <Loader />
      )}

      <Modal isOpen={modalIsOpen} close={toggleModal} data={modalData} />
    </>
  );
}

export default Dashboard;
