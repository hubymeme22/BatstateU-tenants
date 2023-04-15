import React, { useState, useEffect } from 'react';

import Login from './components/Login';
import Signup from './components/Signup';
import Bsu from './components/Bsu';
import Modal from './components/Modal';
import { Container, ContentContainer, Wrapper } from './components/Styled';
import useToggle from '../../../hooks/useToggle';
('../../../hooks/useToggle');
import BackgroundPath from '@/assets/background.webp';

import { getTokenCookie } from '../../../utils/tokenHandler';
import { useNavigate } from 'react-router-dom';

function Index() {
  const [tog, togSet] = useToggle(false);
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();

  function clickEvent() {
    setToggle(!toggle);
  }

  // Redirect to main page if already logged in
  useEffect(() => {
    const token = getTokenCookie();

    if (token) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <>
      <Container bg={BackgroundPath}>
        <ContentContainer>
          {tog ? <Modal handleClick={togSet} /> : null}
          <Wrapper switch={toggle}>
            {toggle ? (
              <Login handle={clickEvent} />
            ) : (
              <Signup handle={clickEvent} handleClick={togSet} />
            )}
          </Wrapper>
          <Bsu toggle={toggle} />
        </ContentContainer>
      </Container>
    </>
  );
}

export default Index;
