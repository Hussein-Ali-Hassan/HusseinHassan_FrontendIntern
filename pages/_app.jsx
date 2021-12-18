import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { FormProvider } from "@/context/FormContext";
import "../styles/globals.css";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#733D47",
      800: "#BF9B9B",
      700: "#F2D8D5",
      600: "#733D47",
      500: "#733D47",
      400: "#733D47",
      300: "#733D47",
      200: "#733D47",
      100: "#733D47",
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
