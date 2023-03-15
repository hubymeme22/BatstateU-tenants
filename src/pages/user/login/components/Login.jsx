import React from 'react';
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
} from './Styled';
function Login({ handle }) {
  return (
    <ComponentContainer>
      <Form>
        <Title> Login</Title>
        <Field>
          <Label>Username</Label>

          <div>
            <Input type='text' id='sr-code' placeholder='Username' />
            <UserIcon />
          </div>
        </Field>
        <Field>
          <Label>Password</Label>

          <div>
            <Input type='password' id='password' placeholder='Password' />
            <KeyIcon />
          </div>
        </Field>
        <Link>Forget Password?</Link>
        <Button> LOGIN </Button>
        <Link>Dont Have An Account?</Link>
        <SignInButton type='button' onClick={handle}>
          Sign in
        </SignInButton>
      </Form>
    </ComponentContainer>
  );
}

export default Login;
