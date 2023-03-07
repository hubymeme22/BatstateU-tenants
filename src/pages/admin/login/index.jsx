import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useInput from '../../../hooks/useInput';

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
  const [SRCode, SRCodeHandler, resetSRCode] = useInput('');
  const [password, passwordHandler, resetPassword] = useInput('');

  const auth = useAuth();

  const submitForm = (e) => {
    e.preventDefault();

    // if valid, login
    //    auth.login();
    // else
    //    show error popup modal
  };

  return (
    <LoginContainer>
      <Form onSubmit={submitForm}>
        <Title>ADMIN LOG IN</Title>

        <Field>
          <Label htmlFor="sr-code" component={'adfdsf'}>
            Username
          </Label>

          <div>
            <Input
              type="text"
              id="sr-code"
              placeholder="Username"
              {...SRCodeHandler}
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
