import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('src/pages/user/login/assets/BSUBG.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
export const ContentContainer = styled.div`
  border-radius: 25px;
  height: 550px;
  width: 800px;
  background-color: white;
  display: flex;
`;
export const Wrapper = styled.div`
  transition: all 0.6s ease-in-out;
  border-radius: 25px;
  width: 50%;
  height: 100%;
  background-color: #651b1b;
  z-index: 5;
  ${(props) =>
    props.switch !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
  `
      : null}
`;

export const ComponentContainer = styled.div`
  margin: 0;
  padding: 30px;
`;
