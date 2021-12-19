import { useRef } from "react";
import { Box, Textarea } from "@chakra-ui/react";

import useFormContext from "@/context/FormContext";
import QuestionInput from "../common/QuestionInput";

export default function Paragraph({
  sectionIndex,
  questionIndex,
  questionPrompt,
}) {
  const promptRef = useRef();

  const { handleQuestionPromptChange } = useFormContext();

  const handlePromptChange = () => {
    const prompt = promptRef.current.value;

    handleQuestionPromptChange(sectionIndex, questionIndex, prompt);
  };

  return (
    <Box>
      <QuestionInput
        questionPrompt={questionPrompt}
        ref={promptRef}
        handlePromptChange={handlePromptChange}
      />
      <Textarea
        width="100%"
        height="160px"
        placeholder="Paragraph"
        variant="filled"
      />
    </Box>
  );
}
