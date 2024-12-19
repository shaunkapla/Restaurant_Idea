import { useState } from 'react';

const handlePins = () => {
  const [pins, setPins] = useState([]);

  const addPin = (newPin) => {
    setPins((prevPins) => [...prevPins, newPin]);
  };

  return {
    pins,
    addPin,
  };
};

export default handlePins;
