import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import dragIcon from '../assets/drag.svg';
import EditModal from '../components/EditModal';
import Label from '../components/Label';
import RenderedInput from '../components/RenderedInput';
import RenderedButton from '../components/RenderedButton';

function Builder() {

  const [elements, setElements] = useState(JSON.parse(window.localStorage.getItem('config')) || []);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [elementIdBeingEdited, setElementIdBeingEdited] = useState(-1);
  const [selectedElementId, setSelectedElementId] = useState(-1);

  const handleDrop = (e) => {
    const type = e.dataTransfer.getData('type');
    const elementIndex = parseInt(e.dataTransfer.getData('elementIndex'));

    if (elementIndex < 0) {
      setElements([...elements, {
        type,
        text: `This is ${type}`,
        x: e.clientX,
        y: e.clientY,
        fontSize: 18,
        fontWeight: 'normal',
      }]);
      setElementIdBeingEdited(elements.length);
      setIsEditModalVisible(true);
    } else {
      const newConfig = [...elements];
      newConfig[elementIndex] = {
        ...newConfig[elementIndex],
        x: e.clientX,
        y: e.clientY,
      };
      setElements(newConfig);
    }
  };

  const handleEditFormSubmit = (values) => {
    setIsEditModalVisible(false);
    setElementIdBeingEdited(-1);
    const newConfig = [...elements];
    newConfig[elementIdBeingEdited] = {
      ...newConfig[elementIdBeingEdited],
      ...values,
      fontSize: `${values.fontSize}`,
    };
    setElements(newConfig);
  };

  const handleNewElementDragStart = (e, type) => {
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('elementIndex', -1);
  };

  const handleExistingElementDragStart = (e, type, elementIndex) => {
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('elementIndex', elementIndex);
  };

  const handleClickOnDrawArea = () => {
    setSelectedElementId(-1);
  };

  const handleExistingElementClick = (e, index) => {
    e.stopPropagation();
    setSelectedElementId(index);
  };

  const handleEnterPress = (e) => {
    if (selectedElementId > -1) {
      e.preventDefault();
      setElementIdBeingEdited(selectedElementId);
      setIsEditModalVisible(true);
    }
  };

  const handleDeletePress = (e) => {
    if (selectedElementId > -1) {
      e.preventDefault();
      const newConfig = [...elements];
      newConfig.splice(selectedElementId, 1);
      setElements(newConfig);
    }
  };

  const keyDown = (e) => {
    if (e.keyCode === 13) {
      handleEnterPress(e);
    }
    if (e.keyCode === 46) {
      handleDeletePress(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  });

  useEffect(() => {
    window.localStorage.setItem('config', JSON.stringify(elements));
  }, [elements]);

  return (
    <Flex h={'100vh'}>
      <Box flex={1} onDragOver={e => e.preventDefault()} onDrop={handleDrop} pos={'relative'}
           onClick={handleClickOnDrawArea}>
        {elements.map((el, index) => {
          if (el.type === 'label') {
            return (
              <Label key={index} el={el} handleExistingElementClick={handleExistingElementClick}
                     handleExistingElementDragStart={handleExistingElementDragStart} index={index}
                     selectedElementId={selectedElementId} />
            );
          }
          if (el.type === 'input') {
            return (
              <RenderedInput key={index} el={el} handleExistingElementClick={handleExistingElementClick}
                             handleExistingElementDragStart={handleExistingElementDragStart} index={index}
                             selectedElementId={selectedElementId} />
            );
          }
          if (el.type === 'button') {
            return (
              <RenderedButton key={index} el={el} handleExistingElementClick={handleExistingElementClick}
                      handleExistingElementDragStart={handleExistingElementDragStart} index={index}
                      selectedElementId={selectedElementId} />
            );
          }

          return null;
        })}
      </Box>
      <Box w={'300px'} bg={'black'} p={'10px'}>
        <Box color={'white'} fontWeight={'bold'} mb={'10px'}>BLOCKS</Box>
        <Flex backgroundColor={'white'} borderRadius={'2px'} w={'100%'} py={'4px'} px={'8px'} draggable='true'
              cursor='grab' onDragStart={e => handleNewElementDragStart(e, 'label')} mb={'10px'}>
          <img alt='' src={dragIcon} draggable='false' /> <Box ml={4}>Label</Box>
        </Flex>
        <Flex backgroundColor={'white'} borderRadius={'2px'} w={'100%'} py={'4px'} px={'8px'} draggable='true'
              cursor='grab' onDragStart={e => handleNewElementDragStart(e, 'input')} mb={'10px'}>
          <img alt='' src={dragIcon} draggable='false' /> <Box ml={4}>Input</Box>
        </Flex>
        <Flex backgroundColor={'white'} borderRadius={'2px'} w={'100%'} py={'4px'} px={'8px'} draggable='true'
              cursor='grab' onDragStart={e => handleNewElementDragStart(e, 'button')}>
          <img alt='' src={dragIcon} draggable='false' /> <Box ml={4}>Button</Box>
        </Flex>
      </Box>

      <EditModal
        isEditModalVisible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible}
        text={elementIdBeingEdited > -1 ? elements[elementIdBeingEdited].text : ''}
        x={elementIdBeingEdited > -1 ? elements[elementIdBeingEdited].x : ''}
        y={elementIdBeingEdited > -1 ? elements[elementIdBeingEdited].y : ''}
        fontSize={elementIdBeingEdited > -1 ? elements[elementIdBeingEdited].fontSize : ''}
        fontWeight={elementIdBeingEdited > -1 ? elements[elementIdBeingEdited].fontWeight : ''}
        onSubmit={handleEditFormSubmit}
      />
    </Flex>
  );
}

export default Builder;
