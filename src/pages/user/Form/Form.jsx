import React from 'react';
import Loader from '@/components/Loader';
import axios from 'axios';
import FormContent from './components/FormContent';
import { FormContainer } from './Styled';
import Download from './components/Download';
function Form() {
  React.useEffect(() => {
    axios
      .get('http://localhost:5050/api/billing/:username')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <FormContainer>
      <FormContent />
      <Download />
    </FormContainer>
  );
}

export default Form;
