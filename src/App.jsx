import { ControlledInputForm } from './ControlledInputForm.jsx';
import { Center, Heading, Flex, Button, Input, Text, Square, Circle } from '@chakra-ui/react';

function App() {
  return (
    <Center className="App">
      <Flex flexDir="column" alignItems="center" width="90%" mt="50" textAlign="center">
        <Heading mb="2rem">Add your quote</Heading>
        <ControlledInputForm />
      </Flex>
    </Center>
  );
}

export default App;
