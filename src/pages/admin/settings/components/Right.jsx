import React, { useEffect, useState } from 'react';

import { RightContainer, Column3, Field } from '../styled';

import { BsHouseAddFill, BsHouseDashFill } from 'react-icons/bs';
import { fetchAsAdmin } from '../../../../services/request';

function Right() {
  const [allSlots, setAllSlots] = useState([]);
  const [dormSlots, setDormSlots] = useState([]);
  const [canteenSlots, setCanteenSlots] = useState([]);

  const [selectedDorm, setSelectedDorm] = useState('');
  const [selectedCanteen, setSelectedCanteen] = useState('');

  // Get all slots list
  useEffect(() => {
    const getSlots = async () => {
      const { data } = await fetchAsAdmin('/slots');
      setAllSlots(data.slots);
    };

    getSlots();
  }, []);

  // Separate the slots by label
  useEffect(() => {
    if (allSlots.length == 0) return;

    const dorm = allSlots.filter((slot) => slot.label == 'dorm');
    const canteen = allSlots.filter((slot) => slot.label == 'canteen');

    setDormSlots(dorm);
    setCanteenSlots(canteen);
  }, [allSlots]);

  const renderOptions = (list) => {
    if (list.length == 0) return;

    return (
      <>
        <option value="">None</option>
        {list.map((slot) => (
          <option key={slot._id} value={slot.slot}>
            {slot.slot}
            {''}
          </option>
        ))}
      </>
    );
  };

  return (
    <RightContainer>
      <h1>Delete or Add Rooms</h1>

      <Column3>
        {/* Row 1 */}
        <p>Dorm</p>

        <Field>
          <select
            name="dorm"
            value={selectedDorm}
            onChange={(e) => setSelectedDorm(e.target.value)}
          >
            {renderOptions(dormSlots)}
          </select>
          <button>Del</button>
        </Field>

        <Field>
          <input type="text" />
          <button>Add</button>
        </Field>

        {/* Row 2 */}
        <p>Canteen</p>

        <Field>
          <select
            name="canteen"
            value={selectedCanteen}
            onChange={(e) => setSelectedCanteen(e.target.value)}
          >
            {renderOptions(canteenSlots)}
          </select>

          <button>Del</button>
        </Field>

        <Field>
          <input type="text" />
          <button>Add</button>
        </Field>
      </Column3>

      <div></div>
    </RightContainer>
  );
}

export default Right;
