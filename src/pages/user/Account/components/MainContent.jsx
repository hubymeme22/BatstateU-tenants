import React from 'react';
import styled from 'styled-components';
function MainContent() {
  return (
    <Container>
      <div>
        <Content>SR-Code</Content>
        <Contents>xxxxx</Contents>
      </div>
      <div>
        <Content>First Name</Content>
        <Contents>xxxxx</Contents>
      </div>
      <div>
        <Content>Last Name</Content>
        <Contents>xxxxx</Contents>
      </div>
      <div>
        <Content>Contact Number</Content>
        <Contents>xxxxx</Contents>
      </div>
      <div>
        <Content>Password</Content>
        <Contents>xxxxx</Contents>
      </div>
      <div>
        <Content>Confirm Password</Content>
        <Contents>xxxxx</Contents>
      </div>
      <div>
        <Content>Verified</Content>
        <Contents>xxxxx</Contents>
      </div>
      <div>
        <Content>Room Number</Content>
        <Contents>xxxxx</Contents>
      </div>
      <div>
        <Content last='last'>Status</Content>
        <Contents last='last'>xxxxx</Contents>
      </div>
    </Container>
  );
}

export default MainContent;

const Container = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: center;
  }
`;
const Content = styled.div`
  border-bottom: ${(props) => (props.last === 'last' ? 'none' : '1px solid')};
  border-right: 1px solid;
  padding: 3px;
  width: 40%;
`;

const Contents = styled.div`
  width: 60%;
  border-bottom: ${(props) => (props.last === 'last' ? 'none' : '1px solid')};
`;
