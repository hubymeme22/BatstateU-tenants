import React, { useEffect, useState } from 'react';

// Components
import Dorm from './components/Dorm';
import Canteen from './components/Canteen';
import Summary from './components/Summary';
import BillingCard from '../../../components/BillingCard';

// Styled-Components
import { Layout } from './styled';
import Modal from './components/Modal';

// Loader
import Loader from '@/components/Loader';
import { dashboardLoader } from '@/services/loaders';
import { fetchAsAdmin } from '@/services/adminFetch';

function Dashboard() {
  // Dashboard states
  const [allRooms, setAllRooms] = useState([]);
  const [dormData, setDormData] = useState([]);
  const [canteenData, setCanteenData] = useState([]);
  const [summary, setSummary] = useState();

  // Modal states
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Invoice states
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [invoiceNames, setInvoiceNames] = useState([]);
  const [invoiceRoom, setInvoiceRoom] = useState({});

  // Retrieve dashboard data from server
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

  const toggleModal = (removeDetails = false) => {
    setModalIsOpen(!modalIsOpen);

    if (removeDetails) {
      setModalData(null);
    }
  };

  const openDetails = async (roomName, label) => {
    toggleModal();

    // get room details
    const roomDetails = await fetchAsAdmin(`/summary/room/${roomName}`);
    setModalData({ ...roomDetails.data.roomSummary, label });
  };

  const toggleInvoice = () => {
    setIsCreatingInvoice(!isCreatingInvoice);
  };

  const addNamesOnInvoice = (list) => {
    setInvoiceNames(list);
  };

  const addRoomOnInvoice = (roomDetails) => {
    setInvoiceRoom(roomDetails);
  };

  return (
    <>
      {allRooms && summary ? (
        <>
          {!isCreatingInvoice ? (
            <Layout>
              <Dorm data={dormData} openDetails={openDetails} />
              <Canteen data={canteenData} openDetails={openDetails} />
              <Summary data={summary} />
            </Layout>
          ) : (
            <BillingCard
              tenants={invoiceNames}
              roomDetails={invoiceRoom}
              toggleInvoice={toggleInvoice}
              toggleModal={toggleModal}
            />
          )}
        </>
      ) : (
        <Loader />
      )}

      <Modal
        data={modalData}
        isOpen={modalIsOpen}
        close={toggleModal}
        toggleInvoice={toggleInvoice}
        includeNames={addNamesOnInvoice}
        includeRoom={addRoomOnInvoice}
      />
    </>
  );
}

export default Dashboard;
