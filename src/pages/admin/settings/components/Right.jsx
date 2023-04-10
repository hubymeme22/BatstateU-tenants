import React, { useEffect, useState } from 'react';

import { RightContainer, Column3, Field } from '../styled';

import { toast } from 'react-toastify';

import useInput from '../../../../hooks/useInput';

import { addRoom, fetchAsAdmin } from '../../../../services/request';
import { doesRoomExist } from '../../../../utils/doesExists';

function Right() {
  const [allSlots, setAllSlots] = useState([]);
  const [dormSlots, setDormSlots] = useState([]);
  const [canteenSlots, setCanteenSlots] = useState([]);

  const [selectedDorm, setSelectedDorm] = useState('');
  const [selectedCanteen, setSelectedCanteen] = useState('');

  const [dormInput, dormInputHandler, resetDormInput] = useInput('');
  const [canteenInput, canteenInputHandler, resetCanteenInput] = useInput('');

  // Get all slots list
  useEffect(() => {
    const getSlots = async () => {
      const { data } = await fetchAsAdmin('/slots');

      // Only include the slot_id (name) & label
      const filteredData = data.slots.map((slot) => {
        return {
          slot_id: slot.slot,
          label: slot.label,
        };
      });

      setAllSlots(filteredData);
    };

    getSlots();
  }, []);

  // Separate the slots by label
  useEffect(() => {
    if (allSlots.length == 0) {
      return;
    }

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
          <option key={slot.slot_id} value={slot.slot_id}>
            {slot.slot_id}
            {''}
          </option>
        ))}
      </>
    );
  };

  const notify = (type, message) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message, { autoClose: 2000 });
        break;
      default:
        toast(message);
    }
  };

  const removeRoom = async (room, label) => {};

  const createRoom = async (room, label) => {
    if (room.trim() == '') {
      notify('error', 'Must not be empty');
      return;
    }

    const doesExistAlready = doesRoomExist(room, label, allSlots);
    if (doesExistAlready) {
      notify('error', `${room} already exists in ${label}`);
      return;
    }

    const roomDetails = {
      slot_id: room,
      max_slot: label == 'dorm' ? 4 : 1,
      label,
    };

    const response = await addRoom(roomDetails);
    notify('success', `Sucessfully added ${room} to ${label}`);

    // Also update the changes locally
    const updateRooms = [...allSlots, { slot_id: room, label }];
    setAllSlots(updateRooms);

    if (label == 'dorm') {
      resetDormInput();
    } else {
      resetCanteenInput();
    }
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
          <input type="text" name="dorm-input" {...dormInputHandler} />
          <button onClick={() => createRoom(dormInput, 'dorm')}>Add</button>
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
          <input type="text" name="canteen-input" {...canteenInputHandler} />
          <button onClick={() => createRoom(canteenInput, 'canteen')}>
            Add
          </button>
        </Field>
      </Column3>

      <div></div>
    </RightContainer>
  );
}

export default Right;
