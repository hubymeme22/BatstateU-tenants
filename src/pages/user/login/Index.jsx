import React, { useEffect, useState } from 'react';

import Login from './components/Login';
import Signup from './components/Signup';
import Bsu from './components/Bsu';

import { Container, ContentContainer, Wrapper } from './components/Styled';

function Index() {
  const [toggle, setToggle] = useState(true);

  function clickEvent() {
    setToggle(!toggle);
  }
  return (
    <Container>
      <ContentContainer>
        <Wrapper switch={toggle}>
          {toggle ? (
            <Login handle={clickEvent} />
          ) : (
            <Signup handle={clickEvent} />
          )}
        </Wrapper>
        <Bsu toggle={toggle} />
      </ContentContainer>
    </Container>
  );
}

export default Index;
