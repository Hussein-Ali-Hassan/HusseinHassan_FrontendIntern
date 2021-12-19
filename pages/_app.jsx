import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { FormProvider } from "@/context/FormContext";
import "../styles/globals.css";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FFFFFF",
      200: "#ACACAC",
      300: "#FABEB7",
      400: "#ECC2C2",
      500: "#F2D8D5",
      600: "#E78F9F",
      700: "#CC6E7F",
      800: "#A05663",
      900: "#733D47",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <FormProvider>
        <Component {...pageProps} />
      </FormProvider>
    </ChakraProvider>
  );
}

export default MyApp;
