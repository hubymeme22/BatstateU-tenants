import React, { useEffect, useState } from 'react';

import {
  LeftContainer,
  Column3,
  StyledButton,
  ButtonContainer,
} from '../styled';
import { settingsLoader } from '../../../../services/loaders';

import { defaultBillingsInit } from '../../../../services/format/FormState';

function Left() {
  const [defaultValues, setDefaultValues] = useState(defaultBillingsInit);
  const [temporary, setTemporary] = useState(defaultBillingsInit);

  useEffect(() => {
    const getData = async () => {
      const response = await settingsLoader();
      setDefaultValues(response.roomBill);
    };

    getData();
  }, []);

  const updateValue = (e) => {
    const { name, value } = e.target;

    const updateVal = {
      ...defaultValues,
      [name]: Number(value),
    };

    setDefaultValues(updateVal);
  };

  return (
    <LeftContainer>
      <h1>Change constant values in Billing</h1>

      <Column3>
        {/* Row 1 */}
        <div></div>
        <em>Water</em>
        <em>Rent</em>

        {/* Row 2 */}
        <div>Dorm</div>
        <div>
          <input
            type="number"
            min="0"
            name="dormWater"
            value={defaultValues.dormWater}
            onChange={(e) => updateValue(e)}
          />
        </div>
        <div>
          <input
            type="number"
            min="0"
            name="canteenWater"
            value={defaultValues.canteenWater}
            onChange={(e) => updateValue(e)}
          />
        </div>

        {/* Row 3 */}
        <div>Canteen</div>
        <div>
          <input
            type="number"
            min="0"
            name="dormRoom"
            value={defaultValues.dormRoom}
            onChange={(e) => updateValue(e)}
          />
        </div>
        <div>
          <input
            type="number"
            min="0"
            name="canteenRoom"
            value={defaultValues.canteenRoom}
            onChange={(e) => updateValue(e)}
          />
        </div>
      </Column3>

      <ButtonContainer>
        <StyledButton>Reset</StyledButton>
        <StyledButton
          color="#C52D2D"
          onClick={() => console.log(defaultValues)}
        >
          Save
        </StyledButton>
      </ButtonContainer>
    </LeftContainer>
  );
}

export default Left;
