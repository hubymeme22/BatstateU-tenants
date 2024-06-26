import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../../../../components/Loader';
import { getTokenCookie } from '../../../../utils/tokenHandler';
import {
  getStudentDetails,
  updateAccountInfo,
} from '../../../../services/request';
import { MD5 } from 'crypto-js';
function MainContent() {
  const [firstName, firstNameSet] = useState('');
  const [lastName, lastNameSet] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [SrCode, SetSrCode] = useState('');

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await getStudentDetails();

      firstNameSet(fetchedData.data.userinfo.details.name.first);
      lastNameSet(fetchedData.data.userinfo.details.name.last);
      setContact(fetchedData.data.userinfo.contact);
      SetSrCode(fetchedData.data.userinfo.email);
    };
    getData();
  }, []);

  //gets value of SR code from email
  const extracted = SrCode.substring(0, 8);

  //SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const V = {
      first: /^[a-zA-ZñÑ]{2,10}(?: [a-zA-ZñÑ]+)?$/gi,
      middle: /^[a-zA-ZñÑ]{2,10}(?: [a-zA-ZñÑ]+)?$/gi,
      last: /^[a-zA-ZñÑ]{2,10}(?: [a-zA-ZñÑ]+)?$/gi,
      email: /^\S+@\S+\.\S+$/gi,
      contact: /[0-9]+/gi,
      username: /^([0-9]{2})-[0-9]{5}$/gi,
      password: /^[\w]{8,20}$/gi,
      confirmPassword: /^[\w]{8,20}$/gi,
    };

    if (!V.first.test(firstName)) {
      setMessage('Invalid First Name');
    } else if (!V.last.test(lastName)) {
      setMessage('Invalid Last Name');
    } else if (!V.contact.test(contact)) {
      setMessage('Invalid Contact');
    } else if (!V.password.test(password)) {
      setMessage('Invalid Password');
    } else if (!V.confirmPassword.test(confirmPassword)) {
      setMessage('Invalid Password');
    } else if (password !== confirmPassword) {
      setMessage("Password Don't Match!");
    } else {
      const userData = {
        token: getTokenCookie(),
        firstname: firstName,
        lastname: lastName,
        contact: contact,
        password: MD5(password).toString(),
      };

      const response = await updateAccountInfo(userData);

      return alert('Password has been Successfully Changed');
    }
  };

  function clearForm() {
    const getData = async () => {
      const fetchedData = await getStudentDetails();

      firstNameSet(fetchedData.data.userinfo.details.name.first);
      lastNameSet(fetchedData.data.userinfo.details.name.last);
      setContact(fetchedData.data.userinfo.contact);
      SetSrCode(fetchedData.data.userinfo.email);
    };

    getData();
  }

  return (
    <>
      <Name>
        {firstName} {lastName}
      </Name>
      {!extracted ? (
        <Loader />
      ) : (
        <Container onSubmit={handleSubmit}>
          <Divide>
            <Divi>
              <Content>SR-Code</Content>
              <Read>{extracted}</Read>
            </Divi>
            <Divi>
              <Content>First Name</Content>
              <Contents
                type='text'
                placeholder='Click to edit'
                value={firstName}
                name='firstName'
                onChange={(e) => firstNameSet(e.target.value)}
                required
              />
            </Divi>
            <Divi>
              <Content>Last Name</Content>
              <Contents
                type='text'
                placeholder='Click to edit'
                value={lastName}
                name='lastName'
                onChange={(e) => lastNameSet(e.target.value)}
                required
              />
            </Divi>
            <Divi>
              <Content>Contact Number</Content>
              <Contents
                placeholder='Click to edit'
                value={contact}
                name='contact'
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </Divi>
            <Divi>
              <Content> Change Password</Content>
              <Contents
                type='password'
                placeholder='Click to change Password'
                value={password}
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Divi>
            <Divi>
              <Content>Confirm Password</Content>
              <Contents
                type='password'
                placeholder='Click to change Password'
                value={confirmPassword}
                name='confirmPassword'
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Divi>
          </Divide>
          <Error>{message}</Error>
          <Cont>
            <Button type='button' onClick={clearForm}>
              Reset Form
            </Button>
            <Button color='green'>Confirm</Button>
          </Cont>
        </Container>
      )}
    </>
  );
}

export default MainContent;
const Error = styled.p`
  font-size: 12px;
  color: red;
`;

const Container = styled.form`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  div {
    display: flex;
    justify-content: center;
  }
`;
const Content = styled.div`
  border-bottom: ${(props) => (props.last === 'last' ? 'none' : '1px solid')};
  border-right: 1px solid;
  padding: 3px;
  width: 50%;
`;

const Contents = styled.input`
  text-align: center;
  border: 1px solid;
  width: 60%;
  border-bottom: ${(props) => (props.last === 'last' ? 'none' : '1px solid')};
`;
const Read = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  width: 60%;
  border-bottom: ${(props) => (props.last === 'last' ? 'none' : '1px solid')};
`;
const Button = styled.button`
  padding: 3px;
  width: 100px;
  background-color: ${(props) =>
    props.color === 'green' ? '#00DF24' : '#9A9A9A'};
  color: white;
  border-radius: 10px;
`;
const Cont = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  gap: 80px;
  justify-content: space-between;
`;
const Divide = styled.div`
  border-radius: 3px;
  flex-direction: column;
  display: flex;
  border: 1px solid;
`;
const Name = styled.h2`
  font-weight: bold;
  text-transform: uppercase;
`;
const Divi = styled.div`
  display: flex;
  justify-content: center;
`;
