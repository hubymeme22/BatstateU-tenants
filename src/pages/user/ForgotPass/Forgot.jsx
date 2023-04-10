import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginContainer,
  Form,
  Title,
  Field,
  UserIcon,
  Label,
  Input,
  Button,
} from './styled';
import BackgroundPath from '@/assets/background.webp';
import { forgotPass, pinInput } from '../../../services/request';

function Forgot() {
  const [code, setCode] = React.useState(null);

  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await forgotPass({ email });
    alert('Thankyou! you will receive a code in your email shortly!');
    setCode(response.data.code);
    return navigate('pinInput');
  };

  return (
    <LoginContainer bg={BackgroundPath}>
      <Form onSubmit={handleSubmit}>
        <Title>FORGOT PASSWORD</Title>
        <Field>
          <Label htmlFor='email'>Kindly input your Email here:</Label>

          <div>
            <Input
              type='text'
              id='email'
              name='email'
              placeholder='20-06113@g.batstate-u.edu.ph'
              onChange={(e) => setEmail(e.target.value)}
            />
            <UserIcon />
          </div>
          <Button> SEND CODE </Button>
        </Field>
      </Form>
    </LoginContainer>
  );
}
export default Forgot;
