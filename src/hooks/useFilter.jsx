import { useState } from 'react';

function useFilter(initialValue) {
  const [value, setValue] = useState(initialValue);

  const changeFilter = (value) => {
    setValue(value);
  };

  return [value, changeFilter];
}

export default useFilter;
