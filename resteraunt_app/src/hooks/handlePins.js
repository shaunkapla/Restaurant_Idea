import { useState } from 'react';

const handlePins = () => {
  const [pins, setPins] = useState([]);

  const addPin = (newPin) => {
    setPins((prevPins) => [...prevPins, newPin]);
  };

  const updatePin = (index, updatedPin) => {
    setPins((prevPins) => 
      prevPins.map((pin, i) => (i === index ? updatedPin : pin))
    );
  };

  const removePin = (index) => {
    setPins((prevPins) => prevPins.filter((_, i) => i !== index));
  };

  return {
    pins,
    addPin,
    updatePin,
    removePin,
  };
};

export default handlePins;
