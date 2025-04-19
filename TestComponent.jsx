import React from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";

const TestComponent = () => {
  return (
    <ChakraProvider>
      <Button colorScheme="blue">Botón de prueba</Button>
    </ChakraProvider>
  );
};

export default TestComponent;
