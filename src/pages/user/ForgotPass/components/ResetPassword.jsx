import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pinInput } from '../../../../services/request';
import styled from 'styled-components';
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

function ResetPassword(props) {
  const navigate = useNavigate();
  const [code, setCode] = React.useState(props.my);
  const [pass, setPass] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const V = {
      pass: /^[\w]{8,20}$/gi,
      confirm: /^[\w]{8,20}$/gi,
    };
    if (pass.length <= 7) {
      setMessage('Password too Short!!');
    } else if (!V.pass.test(pass)) {
      setMessage('Invalid Password');
    } else if (!V.confirm.test(confirm)) {
      setMessage('Invalid Password');
    } else if (pass !== confirm) {
      setMessage("Password Don't Match!");
    } else {
      const response = await pinInput({ pin });
      alert('Thankyou! you will receive a code in your email shortly!');

      console.log(response);
    }
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
              placeholder='Input Password'
              onChange={(e) => setPass(e.target.value)}
            />
            <UserIcon />
          </div>
          <div>
            <Input
              type='password'
              id='pass'
              name='confirm'
              placeholder='Confirm Password'
              onChange={(e) => setConfirm(e.target.value)}
            />
            <UserIcon />
          </div>
          <Message> {message}</Message>
          <Button> Reset Password </Button>
        </Field>
      </Form>
    </LoginContainer>
  );
}
export default ResetPassword;
const Message = styled.p`
  font-size: 12px;
  text-align: center;
  color: red;
  font-weight: bold;
`;
