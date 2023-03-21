import React, { useEffect, useState } from 'react';

import fetchData from '@/utils/fetchData';
import Loader from '@/components/Loader';

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

  const retrieveBoarders = (id) => {};

  return (
    <>
      {slots ? (
        slots.map((slot, index) => {
          const id = slot._id;
          const room = slot.slot;
          const available = slot.available_slot;
          const max = slot.max_slot;

          return (
            <div key={id} onClick={retrieveBoarders}>
              room - {room} -{'>'} {`${available} / ${max}`}
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Dashboard;
