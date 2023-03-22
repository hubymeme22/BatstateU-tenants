import React from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { BsKey } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { Axios } from 'axios';
import styled from 'styled-components';
import {
  Field,
  Namess,
  SignInButton,
  Checkbox,
  EmailIcon,
  Message,
} from './Styled';
function Signup({ handle }) {
  const [message, setMessage] = React.useState('');
  const [value, setValue] = React.useState({
    name: {
      firstName: '',
      middleName: '',
      lastName: '',
    },
    email: '',
    contact: '',
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
  //bug, must count spaces
  //add validation for email
  function handleSubmit(event) {
    event.preventDefault();
    const V = {
      firstName: /^[a-zA-Z]{3,10}(?: [a-zA-Z]+)?$/gi,
      middleName: /^[a-zA-Z]{3,10}(?: [a-zA-Z]+)?$/gi,
      lastName: /^[a-zA-Z]{3,10}(?: [a-zA-Z]+)?$/gi,
      email: /^\S+@\S+\.\S+$/gi,
      contact: /[0-9]+/gi,
      srCode: /^([0-9]{2})-[0-9]{5}$/gi,
      password: /^[\w]{8,20}$/gi,
      confirmPassword: /^[\w]{8,20}$/gi,
    };

    if (
      !V.firstName.test(value.name.firstName) ||
      !V.middleName.test(value.name.middleName) ||
      !V.lastName.test(value.name.lastName) ||
      !V.email.test(value.email) ||
      !V.srCode.test(value.srCode) ||
      !V.contact.test(value.contact) ||
      !V.password.test(value.password) ||
      !V.confirmPassword.test(value.confirmPassword)
    ) {
      setMessage('Inputs must be Valid!');
    } else if (value.password !== value.confirmPassword) {
      setMessage("Password Don't Match!");
    } else {
      axios
        .post('/api/register/student', value)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
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
                value={value.name.firstName}
                name='name'
                onChange={textAdd}
                required
              />
              <UserIcon />
            </div>
            <div>
              <Input
                type='text'
                placeholder='Mid Name'
                value={value.name.middleName}
                name='name'
                onChange={textAdd}
                required
              />
              <UserIcon />
            </div>
            <div>
              <Input
                type='text'
                placeholder='Last Name'
                value={value.name.lastName}
                name='name'
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
              type='number'
              placeholder='Contact Number'
              value={value.contact}
              name='contact'
              onChange={textAdd}
              required
            />
            <KeyIcon />
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
            <SrIcon />
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
const ComponentContainer = styled.div`
  transition: all 0.6s ease-in-out;
  margin: 0;
  padding: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 7px;
  gap: 15px;
`;
const Title = styled.h1`
  font-family: 'Staatliches';
  color: white;
  font-size: 1.9rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 13px;
  border-radius: 5px;
  border: 0;
  font-size: 12px;
  padding-right: 1.7rem;
`;
const UserIcon = styled(FaUserCircle)`
  font-size: 100px;
  width: 17px; ;
`;
const SrIcon = styled(FaUserCircle)`
  font-size: 100px;
`;
const KeyIcon = styled(BsKey)`
  transform: rotate(90deg);
`;
const Register = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
`;
