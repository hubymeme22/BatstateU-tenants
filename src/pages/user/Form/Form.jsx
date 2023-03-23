import React from 'react';
import Loader from '@/components/Loader';
import axios from 'axios';
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
    <div>
      Form
      <Loader />
    </div>
  );
}

export default Form;
