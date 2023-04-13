import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Form, Title, Field, UserIcon, Label, Input, Button } from '../styled';

function ResetPassword(props) {
  const { changePassword } = props;

  const [pass, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [message, setMessage] = React.useState('');

  useEffect(() => {
    if (setMessage == '') return;
    setMessage('');
  }, [pass, confirm]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const V = {
      pass: /^[\w]{8,20}$/gi,
      confirm: /^[\w]{8,20}$/gi,
    };

    if (pass.length <= 7) {
      setMessage('Password too Short!!');
      return;
    } else if (!V.pass.test(pass)) {
      setMessage('Invalid Password');
      return;
    } else if (!V.confirm.test(confirm)) {
      setMessage('Invalid Password');
      return;
    } else if (pass !== confirm) {
      setMessage("Password Don't Match!");
      return;
    }

    changePassword(pass);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title> New Password</Title>
      <Field>
        <Label htmlFor='pass'>Input a new password</Label>

        <div>
          <Input
            type='password'
            name='pass'
            placeholder='Input Password'
            value={pass}
            onChange={(e) => handlePassword(e)}
          />
          <UserIcon />
        </div>
        <div>
          <Input
            type='password'
            name='confirm'
            placeholder='Confirm Password'
            value={confirm}
            onChange={(e) => handleConfirm(e)}
          />
          <UserIcon />
        </div>
        <Message> {message}</Message>
        <Button> Reset Password </Button>
      </Field>
    </Form>
  );
}
export default ResetPassword;
const Message = styled.p`
  font-size: 12px;
  text-align: center;
  color: red;
  font-weight: bold;
`;
