import React from 'react';
import {
  ComponentContainer,
  Title,
  Field,
  Input,
  UserIcon,
  KeyIcon,
  Namess,
  Form,
  SignInButton,
  Checkbox,
  Register,
  EmailIcon,
} from './Styled';
function Signup({ handle }) {
  const [value, setValue] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    srCode: '',
    password: '',
    confirmPassword: '',
    terms: '',
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
  function handleSubmit(event) {
    event.preventDefault();
    console.log(value);
    handle();
    alert('thankyou please wait');
  }
  return (
    <ComponentContainer>
      <Form onSubmit={handleSubmit}>
        <Title> Sign up</Title>
        <Field>
          <Namess>
            <div>
              <Input
                type='text'
                placeholder='First name'
                value={value.firstName}
                name='firstName'
                onChange={textAdd}
              />
              <UserIcon />
            </div>
            <div>
              <Input
                type='text'
                placeholder='Last Name'
                value={value.lastName}
                name='lastName'
                onChange={textAdd}
              />
              <UserIcon />
            </div>
          </Namess>
        </Field>
        <Field>
          <div>
            <Input
              type='text'
              placeholder='Email'
              value={value.email}
              name='email'
              onChange={textAdd}
            />
            <EmailIcon />
          </div>
        </Field>
        <Field>
          <div>
            <Input
              type='text'
              id='password'
              placeholder='SR-CODE'
              value={value.srCode}
              name='srCode'
              onChange={textAdd}
            />
            <UserIcon />
          </div>
        </Field>
        <Field>
          <div>
            <Input
              type='password'
              placeholder='Password'
              value={value.password}
              name='password'
              onChange={textAdd}
            />
            <KeyIcon />
          </div>
        </Field>
        <Field>
          <div>
            <Input
              type='password'
              placeholder='Confirm Password'
              value={value.confirmPassword}
              name='confirmPassword'
              onChange={textAdd}
            />
            <KeyIcon />
          </div>
        </Field>
        <Register>
          <Checkbox>
            <input
              type='checkbox'
              id='terms'
              value={value.terms}
              name='terms'
              onChange={textAdd}
            />
            <label htmlFor='terms'>
              I accept the Terms of Use & Privacy Policy
            </label>
          </Checkbox>
          <SignInButton>REGISTER</SignInButton>
        </Register>
      </Form>
    </ComponentContainer>
  );
}

export default Signup;
