import { useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import useFormContext from "context/FormContext";
import DropDown from "./DropDown";
import SingleChoice from "./SingleChoice";
import MultipleChoice from "./MultipleChoice";
import Paragraph from "./Paragraph";

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
          <Box mb="6">
            <DropDown type={type} handleTypeChange={handleTypeChange} />
          </Box>
          <Flex flexDirection="column" mb="4">
            <Text color="brand.900" mb="2">
              Total marks:
            </Text>
            <InputGroup>
              <Input
                width="180px"
                type="text"
                ref={positiveMarksRef}
                value={positiveMarks}
                onChange={handleMarksChange}
              />
              <InputRightElement color="brand.300" mr="2.5">
                marks
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex flexDirection="column" mb="4">
            <Text color="brand.900" mb="2">
              Negative marks:
            </Text>
            <InputGroup>
              <Input
                width="180px"
                type="text"
                ref={negativeMarksRef}
                value={negativeMarks}
                onChange={handleMarksChange}
              />
              <InputRightElement color="brand.300" mr="2.5">
                marks
              </InputRightElement>
            </InputGroup>
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
