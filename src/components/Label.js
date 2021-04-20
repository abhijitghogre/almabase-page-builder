import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

function Label(props) {
  const el = props.el;
  return (
    <Box pos={'absolute'} left={`${el.x}px`} top={`${el.y}px`} fontWeight={el.fontWeight}
         onDragStart={e => props.handleExistingElementDragStart(e, 'label', props.index)}
         boxShadow={props.selectedElementId === props.index ? '0 0 2px 2px red' : 'none'}
         onClick={e => props.handleExistingElementClick(e, props.index)}
         fontSize={`${el.fontSize}px`} draggable='true' cursor='grab'>
      {el.text}
    </Box>
  );
}

Label.propTypes = {
  el: PropTypes.any,
  handleExistingElementDragStart: PropTypes.func,
  handleExistingElementClick: PropTypes.func,
  index: PropTypes.number,
  selectedElementId: PropTypes.number,
};

export default Label;
