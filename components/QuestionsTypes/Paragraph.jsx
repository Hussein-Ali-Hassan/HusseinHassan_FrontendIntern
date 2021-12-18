import { Box, Text, Textarea } from "@chakra-ui/react";

export default function Paragraph() {
  return (
    <Box>
      <Text mb="6">Question goes here</Text>
      <Textarea
        width="100%"
        height="100%"
        placeholder="Paragraph"
        variant="filled"
        bg="brand.700"
        colorScheme="brand"
      />
    </Box>
  );
}
