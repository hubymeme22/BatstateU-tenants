import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import useInput from '../../../hooks/useInput';
import { checkToken, saveToken } from '../../../utils/tokenHandler';

import {
  LoginContainer,
  Form,
  Title,
  Field,
  Label,
  Input,
  Button,
  Link,
  UserIcon,
  KeyIcon,
} from './styled';

function AdminLogin() {
  const [username, usernameHandler, resetUsername] = useInput('');
  const [password, passwordHandler, resetPassword] = useInput('');

  const auth = useAuth();
  const navigate = useNavigate();

  // Check if user is already loggedIn
  useEffect(() => {
    const token = checkToken();
    if (token) {
      navigate('/admin');
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      console.log('All fields are required');
      return;
    }

    const credential = await auth.login(username, password);

    // Destruct credential object
    const { isLoggedIn, error, token } = await credential;

    // Display error if there is one

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
          <Label htmlFor="username">Username</Label>

          <div>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              {...usernameHandler}
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
              {...passwordHandler}
            />
            <KeyIcon />
          </div>
        </Field>

        <Link>Forget Password?</Link>

        <Button onClick={auth.login}> LOGIN </Button>
      </Form>
    </LoginContainer>
  );
}

export default AdminLogin;
