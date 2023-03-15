import React from 'react';
import { ComponentContainer } from './Styled';
function Signup({ handle }) {
  return (
    <ComponentContainer>
      <form className='signup-form'>
        <h2>Sign up</h2>
        <input type='text' placeholder='Username' /> <br></br>
        <input type='password' placeholder='Password' />
        <br></br>
        <input type='password' placeholder='Confirm password' />
        <button type='submit'>Create account</button>
        <button type='button' onClick={handle}>
          {' '}
          back
        </button>
      </form>
    </ComponentContainer>
  );
}

export default Signup;
