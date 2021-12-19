import { Box, Input, Textarea } from "@chakra-ui/react";

import QuestionInput from "./common/QuestionInput";

export default function Paragraph() {
  return (
    <Box>
      <QuestionInput />
      <Textarea
        width="100%"
        height="160px"
        placeholder="Paragraph"
        variant="filled"
      />
    </Box>
  );
}
