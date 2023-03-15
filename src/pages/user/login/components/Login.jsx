import React from 'react';
import { ComponentContainer } from './Styled';
function Login({ handle }) {
  return (
    <ComponentContainer>
      <form className='login-form'>
        <h2>Login</h2>
        <input type='text' placeholder='Username' /> <br></br>
        <input type='password' placeholder='Password' />
        <button type='submit'>LOGIN</button>
        <br></br>
        wala kaba account?
        <button type='button' onClick={handle}>
          {' '}
          Sign in
        </button>
      </form>
    </ComponentContainer>
  );
}

export default Login;
