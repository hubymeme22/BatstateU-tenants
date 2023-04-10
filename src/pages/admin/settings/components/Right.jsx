import React, { useEffect, useState } from 'react';

import { RightContainer, Column3, Field } from '../styled';

import { BsHouseAddFill, BsHouseDashFill } from 'react-icons/bs';

function Right() {
  const [allSlots, setAllSlots] = useState([]);
  const [dormSlots, setDormSlots] = useState([]);
  const [canteenSlots, setCanteenSlots] = useState([]);

  // Get all tenants list and filter by label
  useEffect(() => {}, []);

  return (
    <RightContainer>
      <h1>Delete or Add Rooms</h1>

      <Column3>
        {/* Row 1 */}
        <p>Dorm</p>

        <Field>
          <select>
            <option></option>
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
          <select>
            <option value="">hello</option>
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
