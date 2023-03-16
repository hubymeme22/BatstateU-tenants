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
  Namess,
  Form,
  SignInButton,
  ButtonContainer,
  Checkbox,
  Register,
} from './Styled';
function Signup({ handle }) {
  return (
    <ComponentContainer>
      <Form>
        <Title> Sign up</Title>
        <Field>
          <Namess>
            <div>
              <Input type='text' id='sr-code' placeholder='Username' />
              <UserIcon />
            </div>
            <div>
              <Input type='text' id='sr-code' placeholder='Username' />
              <UserIcon />
            </div>
          </Namess>
        </Field>
        <Field>
          <div>
            <Input type='text' id='sr-code' placeholder='Username' />
            <UserIcon />
          </div>
        </Field>
        <Field>
          <div>
            <Input type='password' id='password' placeholder='Password' />
            <KeyIcon />
          </div>
        </Field>
        <Field>
          <div>
            <Input type='password' id='password' placeholder='Password' />
            <KeyIcon />
          </div>
        </Field>
        <Field>
          <div>
            <Input type='password' id='password' placeholder='Password' />
            <KeyIcon />
          </div>
        </Field>
        <Register>
          <Checkbox>
            <input type='checkbox' />{' '}
            <label>I accept the Terms of Use & Privacy Policy</label>
          </Checkbox>
          <SignInButton type='button' onClick={handle}>
            REGISTER
          </SignInButton>
        </Register>
      </Form>
    </ComponentContainer>
  );
}

export default Signup;
