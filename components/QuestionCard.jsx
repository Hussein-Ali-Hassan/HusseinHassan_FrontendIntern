import { useRef } from "react";
import { Box, Flex, Center, Divider, Spacer } from "@chakra-ui/react";

import useFormContext from "context/FormContext";
import DropDown from "./QuestionsTypes/DropDown";
import SingleChoice from "./QuestionsTypes/SingleChoice";
import MultipleChoice from "./QuestionsTypes/MultipleChoice";
import Paragraph from "./QuestionsTypes/Paragraph";

export default function QuestionCard({
  sectionIndex,
  questionIndex,
  type,
  positiveMarks,
  negativeMarks,
  setFocusedQuestionIndex,
}) {
  const positiveMarksRef = useRef();
  const negativeMarksRef = useRef();

  const { handleQuestionTypeChange, handleQuestionMarksChange } =
    useFormContext();

  const handleTypeChange = (newType) => {
    handleQuestionTypeChange(sectionIndex, questionIndex, newType);
  };

  const handleMarksChange = () => {
    const positiveMarks = positiveMarksRef.current.value;
    const negativeMarks = negativeMarksRef.current.value;

    handleQuestionMarksChange(
      sectionIndex,
      questionIndex,
      positiveMarks,
      negativeMarks
    );
  };

  return (
    <Flex
      boxShadow="md"
      p="6"
      mb="6"
      rounded="md"
      onMouseEnter={() => setFocusedQuestionIndex(questionIndex)}
    >
      <Flex flexDirection="column">
        <Box>
          <Box mb="4">
            <DropDown type={type} handleTypeChange={handleTypeChange} />
          </Box>
          <Flex flexDirection="column" mb="4">
            <label>Total marks:</label>
            <input
              type="text"
              ref={positiveMarksRef}
              placeholder="Positive marks"
              value={positiveMarks}
              onChange={handleMarksChange}
            />
          </Flex>
          <Flex flexDirection="column" mb="4">
            <label>Negative marks:</label>
            <input
              type="text"
              ref={negativeMarksRef}
              placeholder="Negative marks"
              value={negativeMarks}
              onChange={handleMarksChange}
            />
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Box height="100%" mx="8">
          <Divider orientation="vertical" />
        </Box>
      </Box>
      <Box width="100%">
        {type === "Paragraph" ? (
          <Paragraph />
        ) : type === "Single Choice" ? (
          <SingleChoice
            sectionIndex={sectionIndex}
            questionIndex={questionIndex}
          />
        ) : (
          <MultipleChoice
            sectionIndex={sectionIndex}
            questionIndex={questionIndex}
          />
        )}
      </Box>
    </Flex>
  );
}
