import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Loader from '@/components/Loader';

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
    };
    getData();
  }, []);
  console.log(SrCode);
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Divide>
        <div>
          <Content>SR-Code</Content>
          <Read>20-06113</Read>
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
