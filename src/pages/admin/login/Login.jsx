import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import useInput from '@/hooks/useInput';

// Components
import { LoginContainer, Form, Title, Error } from './styled';
import { Field, Label, Input } from './styled';
import { Button, ViewButton } from './styled';

// Icons
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';

// Utils
import errorTranslator from '@/utils/errorTranslator';
import { getTokenCookie, saveToken } from '@/utils/tokenHandler';

import useToggle from '../../../hooks/useToggle';

function AdminLogin() {
  const [username, usernameHandler, resetUsername] = useInput('');
  const [password, passwordHandler, resetPassword] = useInput('');

  const [viewPassword, toggleViewPassword] = useToggle(false);
  const [errorMsg, setErrorMsg] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  // Check if user is already loggedIn
  useEffect(() => {
    const token = getTokenCookie();

    if (token) {
      navigate('/admin', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (errorMsg == '') return;
    setErrorMsg('');
  }, [username, password]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMsg('All fields are required');
      return;
    }
    //AUTH.LOGIN IS A FUNCTION THAT CONTAINS POST REQUEST OF THE LOGIN
    const credential = await auth.login(username, password, 'admin');

    // Destruct credential object
    const { isLoggedIn, error, token } = await credential;

    // Create new error message based on error from server response
    const newError = errorTranslator(error);
    setErrorMsg(newError);

    // Go to admin panel / dashboard if credential is correct
    if (isLoggedIn && token) {
      saveToken(token);
      navigate('/admin');
    }
  };

  return (
    <LoginContainer>
      <Form onSubmit={submitForm}>
        <Title>ADMIN LOG IN</Title>

        <Field>
          <Label htmlFor='username'>Username</Label>

          <div>
            <Input
              type='text'
              id='username'
              placeholder='Username'
              {...usernameHandler}
            />
            <FaUserCircle />
          </div>
        </Field>

        <Field>
          <Label htmlFor='password'>Password</Label>

          <div>
            <Input
              type={viewPassword ? 'text' : 'password'}
              id='password'
              placeholder='Password'
              {...passwordHandler}
            />

            <ViewButton type='button' onClick={toggleViewPassword}>
              {/*  */}
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </ViewButton>
          </div>
        </Field>

        {/* // Display error if there is one */}
        <Error>{errorMsg}</Error>

        <Button onClick={auth.login}> LOGIN </Button>
      </Form>
    </LoginContainer>
  );
}

export default AdminLogin;
