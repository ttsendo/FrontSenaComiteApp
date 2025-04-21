import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import "./components/styles/Theme.css"; // Importamos el tema personalizado

const theme = extendTheme({
  colors: {
    primary: "#00A86B", // Verde institucional
    secondary: "#F4F4F4", // Gris claro
    text: "#1A202C" // Texto negro/gris oscuro
  },
  fonts: {
    body: "Arial, sans-serif"
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

