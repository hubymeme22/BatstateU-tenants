import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import Button from '../../../components/ui/Button';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Common = styled.div`
  width: min(50%, 600px);
  height: 250px;
  background-color: ${theme.gray};
  padding: 1rem;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LeftContainer = styled(Common)``;

export const RightContainer = styled(Common)``;

export const Column3 = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(2, 2fr);
  align-items: center;
  gap: 1rem;

  em {
    font-weight: bold;
  }

  select,
  option,
  input {
    width: 100%;
    padding: 0.25rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  button:first-child {
    color: #9c0d20;
  }
`;

export const StyledButton = styled(Button)`
  width: 125px;
  color: white;
  font-weight: normal;
  background-color: ${(props) => props.color || '#ffffff'};
`;

export const Field = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;

  select {
    width: 100%;
  }

  option {
    border-radius: 0;
  }

  button {
    padding: 0.25rem 1rem;
  }
`;
