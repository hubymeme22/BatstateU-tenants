import React, { useState, useEffect } from 'react';
import WelcomeLogo from '@/assets/welcome.webp';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Bsu from './components/Bsu';
// import Modal from './components/Modal';

import { Container, ContentContainer } from './styled';
import { Left, Right } from './styled';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';

import { getTokenCookie } from '../../../utils/tokenHandler';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLeftAnimated, setIsLeftAnimated] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  // Redirect to main page if already logged in
  useEffect(() => {
    const token = getTokenCookie();

    if (token) {
      navigate('/', { replace: true });
    }
  }, []);

  const toggleShowLogin = () => {
    setIsLeftAnimated(!isLeftAnimated);
    setTimeout(() => {
      setShowLogin(!showLogin);
    }, 300);
  };

  return (
    <Container>
      <ContentContainer isLeftAnimated={isLeftAnimated}>
        <Left>
          {showLogin ? (
            <LoginForm handle={toggleShowLogin} />
          ) : (
            <SignupForm handle={toggleShowLogin} />
          )}
        </Left>
        <Right>
          <img src={WelcomeLogo} alt="welcome-logo" />
        </Right>
      </ContentContainer>
    </Container>
  );
}

export default Login;
