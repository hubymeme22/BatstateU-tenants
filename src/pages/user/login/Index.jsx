import React, { useState } from 'react';

import Login from './components/Login';
import Signup from './components/Signup';
import Bsu from './components/Bsu';

import { Container, ContentContainer, Wrapper } from './components/Styled';

import BackgroundPath from '@/assets/background.webp';

function Index() {
  const [toggle, setToggle] = useState(true);

  function clickEvent() {
    setToggle(!toggle);
  }

  return (
    <Container bg={BackgroundPath}>
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
