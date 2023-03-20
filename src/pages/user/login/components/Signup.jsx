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
  Message,
} from './Styled';
function Signup({ handle }) {
  const [message, setMessage] = React.useState('');
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
    const V = {
      firstName: /^[a-zA-Z]{4,15}$/gi,
      lastName: /^[a-zA-Z]{4,10}$/gi,
      srCode: /^([0-9]{2})-[0-9]{5}$/gi,
      password: /^[\w-]{8,20}$/gi,
      confirmPassword: /^[\w-]{8,20}$/gi,
    };
    if (
      !V.firstName.test(value.firstName) ||
      !V.lastName.test(value.lastName) ||
      !V.srCode.test(value.srCode) ||
      !V.password.test(value.password) ||
      !V.confirmPassword.test(value.confirmPassword)
    ) {
      setMessage('Inputs must be Valid!');
    } else if (value.password !== value.confirmPassword) {
      setMessage("Password Don't Match!");
    } else {
      alert('thankyou for filling up please wait for the admin confirmation!');
      return handle();
    }
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
                required
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
                required
              />
              <UserIcon />
            </div>
          </Namess>
        </Field>
        <Field>
          <div>
            <Input
              type='email'
              placeholder='Email'
              value={value.email}
              name='email'
              onChange={textAdd}
              required
            />
            <EmailIcon />
          </div>
        </Field>
        <Field>
          <div>
            <Input
              type='text'
              placeholder='SR-CODE'
              value={value.srCode}
              name='srCode'
              onChange={textAdd}
              required
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
              required
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
              required
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
              required
            />
            <label htmlFor='terms'>
              I accept the Terms of Use & Privacy Policy
            </label>
          </Checkbox>
          <Message> {message}</Message>
          <SignInButton>REGISTER</SignInButton>
        </Register>
      </Form>
    </ComponentContainer>
  );
}

export default Signup;
