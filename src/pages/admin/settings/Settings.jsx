import React from 'react';

import { BsHouseAddFill, BsHouseDashFill } from 'react-icons/bs';

import {
  Container,
  Table3x3,
  Left,
  Right,
  ButtonContainer,
  StyledButton,
} from './styled';

import useToggle from '../../../hooks/useToggle';

function Settings() {
  const [modalIsOpen, toggleModalIsOpen] = useToggle(false);

  return (
    <Container>
      <Left>
        <h1>Change constant values in Billing</h1>

        <Table3x3>
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
        </Table3x3>

        <ButtonContainer>
          <StyledButton>Reset</StyledButton>
          <StyledButton color="#C52D2D">Save</StyledButton>
        </ButtonContainer>
      </Left>

      <Right>
        <div>
          <input type="text" />
          <button>Del</button>
        </div>

        <div>
          <input type="text" />
          <button>Del</button>
        </div>

        <div>
          <input type="text" />
          <button>Del</button>
        </div>

        <div>
          <input type="text" />
          <button>Del</button>
        </div>
      </Right>
    </Container>
  );
}

export default Settings;
