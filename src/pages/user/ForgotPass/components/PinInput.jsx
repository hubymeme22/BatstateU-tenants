import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pinInput } from '../../../../services/request';
import {
  LoginContainer,
  Form,
  Title,
  Field,
  UserIcon,
  Label,
  Input,
  Button,
} from '../styled';
import BackgroundPath from '@/assets/background.webp';
import { forgotPass } from '../../../../services/request';
function PinInput() {
  const [code, setCode] = React.useState(87000);
  const navigate = useNavigate();
  const [pin, setPin] = React.useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await pinInput({ pin, code });
    if (response.data.confirmed == false) {
      return console.log('theres an error!');
    } else {
      alert('Thankyou! you will receive a code in your email shortly!');
      console.log(response);
      return navigate('/forgotpass/passwordreset');
    }
  };
  return (
    <LoginContainer bg={BackgroundPath}>
      <Form onSubmit={handleSubmit}>
        <Title> PIN INPUT</Title>
        <Field>
          <Label htmlFor='pin'>
            Input the PIN that you received in your email here:
          </Label>

          <div>
            <Input
              type='number'
              id='pin'
              name='pin'
              placeholder='0123456'
              onChange={(e) => setPin(e.target.value)}
            />
            <UserIcon />
          </div>
          <Button> Confirm Pin </Button>
        </Field>
      </Form>
    </LoginContainer>
  );
}
export default PinInput;
