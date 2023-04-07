import { useState } from 'react';

function useToggle(boolean) {
  const [value, setValue] = useState(boolean);

  const toggleValue = () => {
    setValue(!value);
  };

  return [value, toggleValue];
}

export default useToggle;
