import styled from 'styled-components';
import BgImgPath from '../../../assets/background.webp';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${BgImgPath});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const ContentContainer = styled.div`
  border-radius: 25px;
  height: 550px;
  width: min(90%, 800px);
  background-color: #651b1b;
  display: flex;

  & > div:first-child {
  }

  & > div:last-child {
  }
`;

export const Left = styled.div`
  background-color: inherit;
  border-radius: 25px;
  width: 50%;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Right = styled.div`
  background-color: white;
  width: 50%;
  border-radius: 25px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
