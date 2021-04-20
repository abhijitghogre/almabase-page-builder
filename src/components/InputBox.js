import React from 'react';
import PropTypes from 'prop-types';
import { Box, Input } from '@chakra-ui/react';

function InputBox(props) {
  return (
    <Box mb={'10px'}>
      <label>
        <Box fontSize={'14px'}>{props.label}</Box>
        <Input
          type='text'
          name={props.name}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values[props.name]}
        />
      </label>
      <Box color={'tomato'}
           fontSize={'12px'}>{props.errors[props.name] && props.touched[props.name] && props.errors[props.name]}</Box>
    </Box>
  );
}

InputBox.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.any,
  errors: PropTypes.any,
  touched: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default InputBox;
