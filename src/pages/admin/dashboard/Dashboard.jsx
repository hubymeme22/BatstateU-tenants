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
  const [allRooms, setAllRooms] = useState([]);
  const [dormData, setDormData] = useState([]);
  const [canteenData, setCanteenData] = useState([]);

  const [summary, setSummary] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [invoiceNames, setInvoiceNames] = useState([]);

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

  const openDetails = async (roomName, label) => {
    // Open Modal to show details
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
            <BillingCard tenants={invoiceNames} />
          )}
        </>
      ) : (
        <Loader />
      )}

      <Modal
        isOpen={modalIsOpen}
        close={toggleModal}
        data={modalData}
        includeNames={addNamesOnInvoice}
        toggleInvoice={toggleInvoice}
      />
    </>
  );
}

export default Dashboard;
