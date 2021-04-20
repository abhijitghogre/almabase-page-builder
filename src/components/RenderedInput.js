import React from 'react';
import PropTypes from 'prop-types';
import { Input, Box } from '@chakra-ui/react';

function RenderedInput(props) {
  const el = props.el;
  return (
    <Box boxShadow={props.selectedElementId === props.index ? '0 0 2px 2px red' : 'none'} pos={'absolute'}
         left={`${el.x}px`} top={`${el.y}px`} fontWeight={el.fontWeight}
         onDragStart={e => props.handleExistingElementDragStart(e, 'label', props.index)}
         onClick={e => props.handleExistingElementClick(e, props.index)} w={'auto'}
         draggable='true' cursor='grab'>
      <Input
        _focus={{
          outline: 'none',
        }}
        _active={{
          outline: 'none',
        }}

        cursor={'grab'}
        fontSize={`${el.fontSize}px`} placeholder={el.text} />
    </Box>
  );
}

RenderedInput.propTypes = {
  el: PropTypes.any,
  handleExistingElementDragStart: PropTypes.func,
  handleExistingElementClick: PropTypes.func,
  index: PropTypes.number,
  selectedElementId: PropTypes.number,
};

export default RenderedInput;
