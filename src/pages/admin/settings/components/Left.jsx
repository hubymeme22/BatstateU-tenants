import React, { useEffect, useState } from 'react';

import {
  LeftContainer,
  Column3,
  StyledButton,
  ButtonContainer,
} from '../styled';
import { settingsLoader } from '../../../../services/loaders';

import { defaultBillingsInit } from '../../../../services/format/FormState';
import { updateDefaultPaymentValues } from '../../../../services/request';

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

  useEffect(() => {
    setTemporary(defaultValues);
  }, [defaultValues]);

  const updateValue = (e) => {
    const { name, value } = e.target;

    const updateVal = {
      ...temporary,
      [name]: Number(value),
    };

    setTemporary(updateVal);
  };

  const resetChanges = () => {
    setTemporary(defaultValues);
  };

  const saveChanges = () => {
    setDefaultValues(temporary);

    const { dormWater, dormRoom } = temporary;
    const { canteenWater, canteenRoom } = temporary;

    const newDormDefaults = {
      waterBill: dormWater,
      roomBill: dormRoom,
    };

    const newCanteenDefaults = {
      waterBill: canteenWater,
      roomBill: canteenRoom,
    };

    updateDefaultPaymentValues(newDormDefaults, newCanteenDefaults);
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

        {/* Dorm water */}
        <div>
          <input
            type="number"
            min="0"
            name="dormWater"
            value={temporary.dormWater}
            onChange={(e) => updateValue(e)}
          />
        </div>

        {/* Dorm Rent */}
        <div>
          <input
            type="number"
            min="0"
            name="dormRoom"
            value={temporary.dormRoom}
            onChange={(e) => updateValue(e)}
          />
        </div>

        {/* Row 3 */}
        <div>Canteen</div>

        {/* Canteen Water */}
        <div>
          <input
            type="number"
            min="0"
            name="canteenWater"
            value={temporary.canteenWater}
            onChange={(e) => updateValue(e)}
          />
        </div>

        {/* Canteen Rent */}
        <div>
          <input
            type="number"
            min="0"
            name="canteenRoom"
            value={temporary.canteenRoom}
            onChange={(e) => updateValue(e)}
          />
        </div>
      </Column3>

      <ButtonContainer>
        <StyledButton onClick={resetChanges}>Reset</StyledButton>
        <StyledButton color="#C52D2D" onClick={saveChanges}>
          Save
        </StyledButton>
      </ButtonContainer>
    </LeftContainer>
  );
}

export default Left;
