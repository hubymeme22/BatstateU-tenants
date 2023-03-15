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
  ButtonContainer,
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
        <ButtonContainer>
          <div>
            <Link variant='underline'>Forget Password?</Link>
            <Button> LOGIN </Button>
          </div>
          <div>
            <Link>Dont Have An Account?</Link>
            <SignInButton type='button' onClick={handle}>
              Sign in
            </SignInButton>
          </div>
        </ButtonContainer>
      </Form>
    </ComponentContainer>
  );
}

export default Login;
