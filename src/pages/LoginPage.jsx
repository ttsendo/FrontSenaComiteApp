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
  useToast,
  Link,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_sena: correo, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast({
          title: "Inicio de sesión exitoso",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/dashboard");
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
    <Flex height="100vh" align="center" justify="center" bg="gray.900">
      <Box
        p={8}
        maxWidth="400px"
        borderRadius="20px"
        boxShadow="2xl"
        bg="gray.800"
        color="white"
        textAlign="center"
        transform="scale(1)"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "scale(1.02)", boxShadow: "2xl" }}
      >
        <VStack spacing={6}>
          <Heading size="lg" color="green.400">
            Bienvenido
          </Heading>
          <FormControl>
            <FormLabel color="gray.300">Correo SENA</FormLabel>
            <Input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="usuario@sena.edu.co"
              bg="gray.700"
              border="none"
              color="white"
              _placeholder={{ color: "gray.400" }}
              _focus={{ bg: "gray.600", boxShadow: "outline" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.300">Contraseña</FormLabel>
            <Input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="********"
              bg="gray.700"
              border="none"
              color="white"
              _placeholder={{ color: "gray.400" }}
              _focus={{ bg: "gray.600", boxShadow: "outline" }}
            />
          </FormControl>
          <Button
            colorScheme="green"
            width="full"
            onClick={handleLogin}
            size="lg"
            borderRadius="10px"
            boxShadow="md"
            _hover={{ bg: "green.500", transform: "scale(1.05)" }}
          >
            Ingresar
          </Button>
          {/* Botón de Registro con borde verde y fondo blanco */}
          <Button
            width="full"
            border="2px solid green"
            bg="white"
            color="green.600"
            size="lg"
            borderRadius="10px"
            boxShadow="md"
            _hover={{ bg: "green.100", transform: "scale(1.05)" }}
            onClick={() => navigate("/register")}
          >
            Registrarse
          </Button>
          {/* Link de Olvidaste tu Contraseña */}
          <Text fontSize="sm" color="gray.300">
            ¿Olvidaste tu contraseña?{" "}
            <Link
              color="green.400"
              fontWeight="bold"
              onClick={() => navigate("/forgot-password")}
              _hover={{ textDecoration: "underline", color: "green.300" }}
            >
              Recupérala aquí
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
