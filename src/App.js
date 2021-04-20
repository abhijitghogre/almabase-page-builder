import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Builder from './containers/Builder';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Builder />
    </ChakraProvider>
  );
}

export default App;
