import React from 'react';
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
function Forgot() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('hey');
  }
  return (
    <LoginContainer bg={BackgroundPath}>
      <Form onSubmit={handleSubmit}>
        <Title>FORGOT PASSWORD</Title>
        <Field>
          <Label htmlFor='username'>Kindly input your Email here:</Label>

          <div>
            <Input
              type='text'
              id='username'
              placeholder='20-06113@g.batstate-u.edu.ph'
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
