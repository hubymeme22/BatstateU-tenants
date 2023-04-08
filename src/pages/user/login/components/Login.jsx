import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Styled-components
import {
  ComponentContainer,
  Title,
  Field,
  Label,
  Input,
  UserIcon,
  KeyIcon,
  Link,
  Button,
  Form,
  SignInButton,
  ButtonContainer,
} from './Styled';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import useInput from '@/hooks/useInput';

// utils
import errorTranslator from '@/utils/errorTranslator';
import { saveToken } from '@/utils/tokenHandler';

import { MD5 } from 'crypto-js';

function Login({ handle }) {
  const [username, usernameHandler, resetUsername] = useInput('');
  const [password, passwordHandler, resetPassword] = useInput('');
  const [errorMsg, setErrorMsg] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMsg('All fields are required');
      return;
    }

    // Encrypt password
    const hashedPassword = MD5(password).toString();
    const credential = await auth.login(username, hashedPassword);

    // Destruct credential object
    const { isLoggedIn, error, token } = await credential;

    // Create new error message based on error from server response
    const newError = errorTranslator(error);
    setErrorMsg(newError);

    // Go to admin panel / dashboard if credential is correct
    if (isLoggedIn && token) {
      saveToken(token);
      navigate('/');
    }
  };

  return (
    <ComponentContainer>
      <Form onSubmit={submitForm}>
        <Title> Login</Title>
        <Field>
          <Label htmlFor="username">Username</Label>
          <div>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              {...usernameHandler}
              required
            />
            <UserIcon />
          </div>
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <div>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              {...passwordHandler}
              required
            />
            <KeyIcon />
          </div>
        </Field>

        <ButtonContainer>
          <div>
            <Link variant="underline">Forgot Password?</Link>
            {errorMsg ? <> {errorMsg} </> : null}
            <Button> LOGIN </Button>
          </div>

          <div>
            <Link>Dont Have An Account?</Link>

            <SignInButton type="button" onClick={handle}>
              Sign up
            </SignInButton>
          </div>
        </ButtonContainer>
      </Form>
    </ComponentContainer>
  );
}

export default Login;
