import React from "react";
import { Input } from "@chakra-ui/react";

const QuestionInput = React.forwardRef(
  ({ questionPrompt, handlePromptChange }, ref) => (
    <Input
      ref={ref}
      value={questionPrompt}
      onChange={handlePromptChange}
      mb="8"
      variant="unstyled"
      color="brand.900"
      placeholder="Question goes here..."
    />
  )
);

QuestionInput.displayName = "QuestionInput";

export default QuestionInput;
