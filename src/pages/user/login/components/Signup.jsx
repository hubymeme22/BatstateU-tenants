import React from 'react';
import styled from 'styled-components';
import useToggle from '../../../../hooks/useToggle';
import { FaUserCircle } from 'react-icons/fa';
import { BsKey } from 'react-icons/bs';

import {
  Field,
  Namess,
  SignInButton,
  Checkbox,
  EmailIcon,
  Message,
} from './Styled';

import { registerStudent } from '../../../../services/request';
import { MD5 } from 'crypto-js';
import Modal from './Modal';

function Signup({ handle }) {
  const [tog, togSet] = useToggle(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const V = {
      first: /^[a-zA-ZñÑ]{2,10}(?: [a-zA-ZñÑ]+)?$/gi,
      middle: /^(|[a-zA-Z]|[a-zA-Z]+)$/gi,
      last: /^[a-zA-ZñÑ]{2,10}(?: [a-zA-ZñÑ]+)?$/gi,
      email: /^\S+@\S+\.\S+$/gi,
      contact: /[0-9]+/gi,
      username: /^([0-9]{2})-[0-9]{5}$/gi,
      password: /^[\w]{8,20}$/gi,
      confirmPassword: /^[\w]{8,20}$/gi,
    };

    if (!V.first.test(value.name.first)) {
      setMessage('Invalid First Name');
    } else if (!V.middle.test(value.name.middle)) {
      setMessage('Invalid Mid Name');
    } else if (!V.last.test(value.name.last)) {
      setMessage('Invalid Last Name');
    } else if (!V.email.test(value.email)) {
      setMessage('Invalid Email ');
    } else if (!V.username.test(value.username)) {
      setMessage('Invalid SR CODE');
    } else if (!V.contact.test(value.contact)) {
      setMessage('Invalid Contact');
    } else if (!V.password.test(value.password)) {
      setMessage('Invalid Password');
    } else if (!V.confirmPassword.test(value.confirmPassword)) {
      setMessage('Invalid Password');
    } else if (value.password !== value.confirmPassword) {
      setMessage("Password Don't Match!");
    } else {
      const response = await registerStudent({
        ...value,
        password: MD5(value.password).toString(),
      });

      alert('thankyou for filling up please wait for the admin confirmation!');
      return handle();
    }
  };
  function Backbutton() {
    return handle();
  }

  return (
    <ComponentContainer>
      {tog ? (
        <Modal handleClick={togSet} />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Title> Sign up</Title>
          <Field>
            <Namess>
              <div>
                <Input
                  type='text'
                  placeholder='FIRST NAME:'
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
                  placeholder='MID NAME:'
                  value={value.name.middle}
                  name='middle'
                  onChange={nameAdd}
                />
                <UserIcon />
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='LAST NAME:'
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
                placeholder='EMAIL: eg. juancruz@gmail.com'
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
                placeholder='CONTACT NUMBER: eg. 09735678935'
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
                placeholder='SR-CODE: eg. 20-06113'
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
                placeholder='PASSWORD: atleast 8 characters'
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
                placeholder='CONFIRM PASSWORD: atleast 8 characters'
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
                <Textinline> I accept the</Textinline>
              </label>
              <HaveAcc onClick={togSet}>
                {' '}
                Terms of Use & Privacy Policy{' '}
              </HaveAcc>
            </Checkbox>

            <Message> {message}</Message>
            <HaveAcc onClick={Backbutton}>I already Have an account</HaveAcc>
            <SignInButton>REGISTER</SignInButton>
          </Register>
        </Form>
      )}
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
  flex-direction: column;

  height: 100%;
  gap: 50px;
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
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
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
  display: inline;
  width: auto;
  cursor: pointer;
  font-size: 15px;
  text-decoration: underline;
`;
const Textinline = styled(HaveAcc)`
  text-decoration: none;
`;
