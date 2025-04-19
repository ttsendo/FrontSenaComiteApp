import { Box, Flex, Heading, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Flex height="100vh">
      {/* Barra Lateral */}
      <Box
        w="250px"
        bg="green.700"
        color="white"
        p={4}
        display="flex"
        flexDirection="column"
      >
        <Heading size="md" mb={6} textAlign="center">
          SENA Comités
        </Heading>
        <VStack spacing={4}>
          <Button w="full" colorScheme="whiteAlpha">
            Inicio
          </Button>
          <Button w="full" colorScheme="whiteAlpha">
            Comités
          </Button>
          <Button w="full" colorScheme="whiteAlpha">
            Notificaciones
          </Button>
          <Button w="full" colorScheme="red" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </VStack>
      </Box>

      {/* Área Principal */}
      <Box flex="1" p={6}>
        <Heading size="lg" color="green.700">
          Bienvenido al Panel de Gestión
        </Heading>
      </Box>
    </Flex>
  );
};

export default Dashboard;
