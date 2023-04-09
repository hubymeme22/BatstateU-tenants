import React from 'react';

import { RightContainer, Column3, Field } from '../styled';

import { BsHouseAddFill, BsHouseDashFill } from 'react-icons/bs';

function Right() {
  return (
    <RightContainer>
      <h1>Delete or Add Rooms</h1>

      <Column3>
        {/* Row 1 */}
        <p>Dorm</p>

        <Field>
          <select>
            <option value=""></option>
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
            <option value=""></option>
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
