import React from 'react';

import {
  LeftContainer,
  Column3,
  StyledButton,
  ButtonContainer,
} from '../styled';

function Left() {
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
          <input type="number" />
        </div>
        <div>
          <input type="number" />
        </div>

        {/* Row 3 */}
        <div>Canteen</div>
        <div>
          <input type="number" />
        </div>
        <div>
          <input type="number" />
        </div>
      </Column3>

      <ButtonContainer>
        <StyledButton>Reset</StyledButton>
        <StyledButton color="#C52D2D">Save</StyledButton>
      </ButtonContainer>
    </LeftContainer>
  );
}

export default Left;
