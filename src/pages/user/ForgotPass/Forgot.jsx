import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MD5 } from 'crypto-js';

import {
  LoginContainer,
  Form,
  Title,
  Field,
  UserIcon,
  Label,
  Input,
  Button,
  Message,
} from './styled';

import BackgroundPath from '@/assets/background.webp';
import PinInput from './components/PinInput';
import ResetPassword from './components/ResetPassword';
import Loader from '../../../components/Loader';

import useToggle from '../../../hooks/useToggle';

import {
  forgotPass,
  enterPin,
  resetAccountPassword,
} from '../../../services/request';

function Forgot() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(null);
  const [pin, setPin] = useState(null);
  const [message, setMessage] = useState('');
  const [errMessage, errSetMessage] = useState('');

  const [loading, toggleLoading] = useToggle(false);

  const [step, setStep] = useState('first');

  const navigate = useNavigate();

  const sendEmail = async (e) => {
    e.preventDefault();
    const emailRegex = /^[\d]{2}-[\d]{5}@g\.batstate-u\.edu\.ph$/;
    if (!emailRegex.test(email)) {
      errSetMessage('Please input a valid BSU email!');
    } else {
      toggleLoading();

      const response = await forgotPass({ email });

      toggleLoading();
      alert('Thankyou! you will receive a code in your email shortly!');

      console.log(response);

      localStorage.setItem('code', response.data.code);

      return nextStep('second');
    }
  };

  const sendInputPin = async (e) => {
    e.preventDefault();

    const response = await enterPin(pin);

    console.log(response);

    localStorage.setItem('key', response.data.key);
    console.log(localStorage.getItem('key'));
    if (response.data.error == '') {
      nextStep('third');
    } else {
      setMessage('INVALID PIN INPUT!');
    }
  };
  // if (!pin) {
  //   setMessage('Wrong Pin! Please input again');
  // } else {
  //   const response = await enterPin(pin, code);
  //   console.log(response);
  //   setCode(response.data.key);
  //   return nextStep('third');
  // }
  const changePassword = async (password) => {
    // Encrypt password
    const hashedPassword = MD5(password).toString();
    const response = await resetAccountPassword(hashedPassword, code);

    console.log(response);

    alert('Password reset is successful, Try logging in !');
    navigate('/login');
  };

  const nextStep = (step) => {
    setStep(step);
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  return (
    <LoginContainer bg={BackgroundPath}>
      {/* First Step - send email */}

      {step == 'first' && (
        <Form onSubmit={sendEmail}>
          {!loading ? (
            <>
              <Title>FORGOT PASSWORD</Title>

              <Field>
                <Label htmlFor='email'>Kindly input your Email here:</Label>

                <div>
                  <Input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='20-06113@g.batstate-u.edu.ph'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <UserIcon />
                </div>
                <Message> {errMessage}</Message>
                <Button> SEND CODE </Button>
                <Button type='button' onClick={() => navigate('/login')}>
                  {' '}
                  BACK TO LOGIN{' '}
                </Button>
              </Field>
            </>
          ) : (
            <Loader />
          )}
        </Form>
      )}

      {/* Second Step - enter code */}
      {step == 'second' && (
        <PinInput
          handlePinChange={handlePinChange}
          sendInputPin={sendInputPin}
          errorMessage={message}
        />
      )}

      {/* Third Step - Change password */}

      {step == 'third' && <ResetPassword changePassword={changePassword} />}
    </LoginContainer>
  );
}
export default Forgot;
