import React from 'react';

import { Form, Title, Field, UserIcon, Label, Input, Button } from '../styled';

function PinInput({ handlePinChange, sendInputPin, ErrorMessage }) {
  return (
    <Form onSubmit={sendInputPin}>
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
            onChange={(e) => handlePinChange(e)}
          />
          <UserIcon />
        </div>
        {ErrorMessage}
        <Button> Confirm Pin </Button>
      </Field>
    </Form>
  );
}
export default PinInput;
