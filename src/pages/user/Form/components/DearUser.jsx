import React from 'react';
import styled from 'styled-components';

function DearUser() {
  return (
    <Content>
      <Container>
        <Info>
          Name:<Fetched>Lorem ipsum</Fetched>{' '}
        </Info>
        <Info>
          Date:<Fetched>Lorem ipsum</Fetched>
        </Info>
      </Container>
      <Container>
        <Info>
          Sr-Code:<Fetched>Lorem ipsum</Fetched>
        </Info>
        <Info>
          Room No:<Fetched>Lorem ipsum</Fetched>
        </Info>
      </Container>
      <br />
      <Msg>
        <div>Sir/Maam:</div>
        <div>
          This is your billing statement for the use of BatStateU - NEU
          Alangilan Campus Dormitory For the month of March.{' '}
        </div>
      </Msg>
    </Content>
  );
}

export default DearUser;
const Content = styled.div`
  font-size: 13px;
  width: 100%;

  display: flex;
  flex-direction: column;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
`;
const Info = styled.div`
  display: flex;
  gap: 10px;
`;
const Fetched = styled.p``;

const Msg = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
`;
