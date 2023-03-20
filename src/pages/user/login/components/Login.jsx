import React from 'react';
import { useAuth } from '../../../../hooks/useAuth';
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
  const [value, setValue] = React.useState({
    username: '',
    password: '',
  });

  function textAdd(event) {
    setValue(function (prev) {
      const { name, value, type, checked } = event.target;
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  function submiButton(event) {
    event.preventDefault();
  }

  return (
    <ComponentContainer>
      <Form onSubmit={submiButton}>
        <Title> Login</Title>
        <Field>
          <Label htmlFor="username">Username</Label>
          <div>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              value={value.username}
              name="username"
              onChange={textAdd}
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
              value={value.password}
              name="password"
              onChange={textAdd}
            />
            <KeyIcon />
          </div>
        </Field>
        <ButtonContainer>
          <div>
            <Link variant="underline">Forget Password?</Link>
            <Button> LOGIN </Button>
          </div>
          <div>
            <Link>Dont Have An Account?</Link>
            <SignInButton type="button" onClick={handle}>
              Sign in
            </SignInButton>
          </div>
        </ButtonContainer>
      </Form>
    </ComponentContainer>
  );
}

export default Login;
