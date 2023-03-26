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
      first: '',
      middle: '',
      last: '',
    },
    email: '',
    contact: '',
    username: '',
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

  const nameAdd = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({
      ...prevState,
      name: {
        ...prevState.name,
        [name]: value,
      },
    }));
  };
  function handleSubmit(event) {
    event.preventDefault();
    const V = {
      first: /^[a-zA-Z]{2,10}(?: [a-zA-Z]+)?$/gi,
      middle: /^[a-zA-Z]{2,10}(?: [a-zA-Z]+)?$/gi,
      last: /^[a-zA-Z]{2,10}(?: [a-zA-Z]+)?$/gi,
      email: /^\S+@\S+\.\S+$/gi,
      contact: /[0-9]+/gi,
      username: /^([0-9]{2})-[0-9]{5}$/gi,
      password: /^[\w]{8,20}$/gi,
      confirmPassword: /^[\w]{8,20}$/gi,
    };

    if (
      !V.first.test(value.name.first) ||
      !V.middle.test(value.name.middle) ||
      !V.last.test(value.name.last) ||
      !V.email.test(value.email) ||
      !V.username.test(value.username) ||
      !V.contact.test(value.contact) ||
      !V.password.test(value.password) ||
      !V.confirmPassword.test(value.confirmPassword)
    ) {
      setMessage('Inputs must be Valid!');
    } else if (value.password !== value.confirmPassword) {
      setMessage("Password Don't Match!");
    } else {
      axios
        .post('http://localhost:5050/api/register/student', value)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      alert('thankyou for filling up please wait for the admin confirmation!');
      return handle();
    }
  }
  function Backbutton() {
    return handle();
  }
  console.log(value);
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
                value={value.name.first}
                name='first'
                onChange={nameAdd}
                required
              />
              <UserIcon />
            </div>
            <div>
              <Input
                type='text'
                placeholder='Mid Name'
                value={value.name.middle}
                name='middle'
                onChange={nameAdd}
                required
              />
              <UserIcon />
            </div>
            <div>
              <Input
                type='text'
                placeholder='Last Name'
                value={value.name.last}
                name='last'
                onChange={nameAdd}
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
              value={value.username}
              name='username'
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
          <HaveAcc onClick={Backbutton}>I already Have an account</HaveAcc>
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
  gap: 12px;
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
const HaveAcc = styled.p`
  width: auto;
  cursor: pointer;
  font-size: 15px;
  text-decoration: underline;
`;
