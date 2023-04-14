import React, { useEffect, useState } from 'react';
import useInput from '../../../../hooks/useInput';

import { RightContainer, Column3, Field } from '../styled';

import {
  addRoom,
  deleteRoom,
  fetchAsAdmin,
} from '../../../../services/request';
import { doesRoomExist, sortByRoomNames } from '../../../../utils/dataFilters';

import { showSuccessToast, showErrorToast } from '../../../../utils/toast';

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
          slot: slot.slot,
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

    const slots = sortByRoomNames(allSlots);

    const dorm = slots.filter((slot) => slot.label == 'dorm');
    const canteen = slots.filter((slot) => slot.label == 'canteen');

    setDormSlots(dorm);
    setCanteenSlots(canteen);
  }, [allSlots]);

  const renderOptions = (list) => {
    if (list.length == 0) return;

    return (
      <>
        <option value="">None</option>
        {list.map((slot) => (
          <option key={slot.slot} value={slot.slot}>
            {slot.slot}
            {''}
          </option>
        ))}
      </>
    );
  };

  const removeRoom = async (room, label) => {
    if (room == '') return;

    const response = await deleteRoom(room);

    // Also remove locally
    const roomDetails = {
      slot: room,
      label,
    };

    const updatedRooms = allSlots.filter((slot) => {
      return JSON.stringify(slot) != JSON.stringify(roomDetails);
    });

    setAllSlots(updatedRooms);
    showSuccessToast(`Successfully deleted ${room} from ${label}`);
  };

  const createRoom = async (room, label) => {
    if (room.trim() == '') {
      showErrorToast('Must not be empty');
      return;
    }

    const doesExistAlready = doesRoomExist(room, allSlots);
    if (doesExistAlready) {
      showErrorToast(`${room} already exists`);
      return;
    }

    const roomDetails = {
      slot_id: room,
      max_slot: label == 'dorm' ? 4 : 1,
      label,
    };

    const response = await addRoom(roomDetails);
    showSuccessToast(`Sucessfully added ${room} to ${label}`);

    // Also update the changes locally
    const updateRooms = [...allSlots, { slot: room, label }];
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
          <button onClick={() => removeRoom(selectedDorm, 'dorm')}>Del</button>
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

          <button onClick={() => removeRoom(selectedCanteen, 'canteen')}>
            Del
          </button>
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
