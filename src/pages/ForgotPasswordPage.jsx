import { useState } from "react";
import { 
  Box, 
  Button, 
  Input, 
  FormControl, 
  FormLabel, 
  Flex, 
  VStack, 
  Heading, 
  useToast 
} from "@chakra-ui/react";

const ForgotPasswordPage = () => {
  const [correo, setCorreo] = useState("");
  const toast = useToast();

  const handleForgotPassword = async () => {
    if (!correo) {
      toast({
        title: "Error",
        description: "El correo es obligatorio",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_sena: correo }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Correo enviado",
          description: "Revisa tu bandeja de entrada",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="gray.100">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
        <VStack spacing={4}>
          <Heading size="lg" color="green.600">
            Recuperar Contraseña
          </Heading>
          <FormControl>
            <FormLabel>Correo SENA</FormLabel>
            <Input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="usuario@sena.edu.co"
            />
          </FormControl>
          <Button colorScheme="green" width="full" onClick={handleForgotPassword}>
            Enviar Enlace
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ForgotPasswordPage;
