import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

function MainContent() {
  const [firstName, firstNameSet] = React.useState('');
  const [lastName, lastNameSet] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [SrCode, SetSrCode] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await axios.get(
        'http://localhost:5050/api/student/details'
      );
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
  function handleSubmit(e) {
    e.preventDefault();
    const V = {
      first: /^[a-zA-Z]{2,10}(?: [a-zA-Z]+)?$/gi,
      middle: /^[a-zA-Z]{2,10}(?: [a-zA-Z]+)?$/gi,
      last: /^[a-zA-Z]{2,10}(?: [a-zA-Z]+)?$/gi,
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
      axios
        .post('http://localhost:5050/api/student/update-info', {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGF0YSI6eyJkZXRhaWxzIjp7Im5hbWUiOnsiZmlyc3QiOiJIdWJlcnQiLCJtaWRkbGUiOiJGb2xpZW50ZSIsImxhc3QiOiJFc3Bpbm9sYSJ9fSwiX2lkIjoiNjQyNDVhZGFkZDAwYzJkZTY1YmRlZWFkIiwidXNlcm5hbWUiOiIyMC0wNTg0NSIsImVtYWlsIjoiMjAtMDU4NDVAZy5iYXRzdGF0ZS11LmVkdS5waCIsInBhc3N3b3JkIjoib2ggbm8sIHdoeSB1IGxvb2tpbj8iLCJjb250YWN0IjoiKzkzOTM5NDY4MTM0NyIsImFjY2VzcyI6InN0dWRlbnQiLCJ2ZXJpZmllZCI6dHJ1ZSwicm9vbSI6IjY0MjQ1YjA1ZGQwMGMyZGU2NWJkZWVhZiIsIl9fdiI6MH0sImlhdCI6MTY4MDM3MDQ4NX0.d2mFd17SprZlcRqHKRgKLbiiYEL1R6iAHjq1sTzv_HQ',
          firstname: firstName,
          lastname: lastName,
          contact: contact,
          password: password,
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));

      return alert(
        'thankyou for filling up please wait for the admin confirmation!'
      );
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Divide>
        <div>
          <Content>SR-Code</Content>
          <Read>{extracted}</Read>
        </div>
        <div>
          <Content>First Name</Content>
          <Contents
            type='text'
            placeholder='Click to edit'
            value={firstName}
            name='firstName'
            onChange={(e) => firstNameSet(e.target.value)}
            required
          />
        </div>
        <div>
          <Content>Last Name</Content>
          <Contents
            type='text'
            placeholder='Click to edit'
            value={lastName}
            name='lastName'
            onChange={(e) => lastNameSet(e.target.value)}
            required
          />
        </div>
        <div>
          <Content>Contact Number</Content>
          <Contents
            placeholder='Click to edit'
            value={contact}
            name='contact'
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div>
          <Content>Password</Content>
          <Contents
            type='password'
            placeholder='Click to change Password'
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Content>Confirm Password</Content>
          <Contents
            type='password'
            placeholder='Click to change Password'
            value={confirmPassword}
            name='confirmPassword'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Content>Verified</Content>
          <Read>YES</Read>
        </div>
        <div>
          <Content>Room Number</Content>
          <Read>ROOM 4A</Read>
        </div>
        <div>
          <Content last='last'>Status</Content>
          <Read last='last'>xxxxx</Read>
        </div>
      </Divide>
      <Error>{message}</Error>
      <Cont>
        <Button type='button'>Cancel</Button>
        <Button color='green'>Confirm</Button>
      </Cont>
    </Container>
  );
}

export default MainContent;
const Error = styled.p`
  font-sizs: 12px;
  color: red;
`;

const Container = styled.form`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  div {
    display: flex;
    justify-content: center;
  }
`;
const Content = styled.div`
  border-bottom: ${(props) => (props.last === 'last' ? 'none' : '1px solid')};
  border-right: 1px solid;
  padding: 3px;
  width: 40%;
`;

const Contents = styled.input`
  text-align: center;
  border: 1px solid;
  width: 60%;
  border-bottom: ${(props) => (props.last === 'last' ? 'none' : '1px solid')};
`;
const Read = styled.div`
  color: grey;
  width: 60%;
  border-bottom: ${(props) => (props.last === 'last' ? 'none' : '1px solid')};
`;
const Button = styled.button`
  padding: 3px;
  background-color: ${(props) =>
    props.color === 'green' ? '#00DF24' : '#9A9A9A'};
  color: white;
  border-radius: 10px;
`;
const Cont = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  gap: 100px;
  justify-content: space-between;
`;
const Divide = styled.div`
  border-radius: 3px;
  flex-direction: column;
  display: flex;
  border: 1px solid;
`;
