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

function ResetPassword() {
  const navigate = useNavigate();
  const [pass, setPass] = React.useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await pinInput({ pin });
    alert('Thankyou! you will receive a code in your email shortly!');

    console.log(response);
  };

  return (
    <LoginContainer bg={BackgroundPath}>
      <Form onSubmit={handleSubmit}>
        <Title> New Password</Title>
        <Field>
          <Label htmlFor='pass'>Input a new password</Label>

          <div>
            <Input
              type='password'
              id='pass'
              name='pass'
              placeholder='Use strong password!'
              onChange={(e) => setPass(e.target.value)}
            />
            <UserIcon />
          </div>
          <Button> Reset Password </Button>
        </Field>
      </Form>
    </LoginContainer>
  );
}
export default ResetPassword;
