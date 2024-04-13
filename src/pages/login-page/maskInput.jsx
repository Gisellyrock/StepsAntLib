import React from 'react';
import { cpfMask } from './mask';
import { FormControl } from 'react-bootstrap';

const maskFunctions = {
  cpf: cpfMask,
};

const MaskInput = ({ mask, handleChange, ...inputProps }) => {
  const handleChangeText = React.useCallback(
    (e) => {
      const maskFunction = maskFunctions[mask];
      if (maskFunction) {
        const value = maskFunction(e.currentTarget.value);
        handleChange(value);
        e.currentTarget.value = value;
      }
    },
    [mask],
  );

  return (
    <FormControl
      type="text"
      onChange={(e) => handleChangeText(e)}
      {...inputProps}
    />
  );
};

export default MaskInput;
