import { useRef, useState } from "react";
import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import useFormContext from "@/context/FormContext";
import QuestionInput from "../common/QuestionInput";
import AddOption from "../common/AddOption";

const initialOptions = [
  {
    answer: "",
    isCorrect: false,
  },
];

export default function MultipleChoice({
  sectionIndex,
  questionIndex,
  questionPrompt,
}) {
  const promptRef = useRef();

  const {
    sections,
    handleSingleAndMultipleChoiceQuestionChange,
    handleQuestionPromptChange,
  } = useFormContext();
  // if exists -> use the options from the duplicated question
  // else -> stick to the initialOptions
  const [options, setOptions] = useState(
    sections[sectionIndex].questions[questionIndex].options || initialOptions
  );

  const handleOptionsChange = (event) => {
    const newOptions = JSON.parse(JSON.stringify(options));

    if (event.target.name === "answer")
      newOptions[event.target.dataset.id][event.target.name] =
        event.target.value;
    else newOptions[event.target.dataset.id].isCorrect = event.target.checked;

    setOptions(newOptions);
    handleSingleAndMultipleChoiceQuestionChange(
      sectionIndex,
      questionIndex,
      newOptions
    );
  };

  const handlePromptChange = () => {
    const prompt = promptRef.current.value;

    handleQuestionPromptChange(sectionIndex, questionIndex, prompt);
  };

  const addNewOption = () => {
    const newOptions = JSON.parse(JSON.stringify(options));
    newOptions.push({ answer: "", isCorrect: false });

    setOptions(newOptions);
  };

  const deleteOption = (index) => {
    const newOptions = JSON.parse(JSON.stringify(options));
    newOptions = newOptions.filter((_, idx) => idx !== index);

    setOptions(newOptions);
    handleSingleAndMultipleChoiceQuestionChange(
      sectionIndex,
      questionIndex,
      newOptions
    );
  };

  return (
    <>
      <Flex flexDirection="column">
        <QuestionInput
          questionPrompt={questionPrompt}
          ref={promptRef}
          handlePromptChange={handlePromptChange}
        />
        {options.map((item, index) => (
          <Flex
            key={index}
            mb="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <input
              name={`isCorrect ${questionIndex}`}
              data-id={index}
              type="checkbox"
              checked={item.isCorrect}
              value={item.isCorrect}
              onChange={handleOptionsChange}
            />
            <InputGroup ml="4">
              <Input
                placeholder={`Option ${index + 1}`}
                name="answer"
                data-id={index}
                type="text"
                value={item.answer}
                onChange={handleOptionsChange}
              />
              <InputRightElement
                bg="brand.600"
                rounded="full"
                color="white"
                width="24px"
                height="24px"
                mt="2"
                mr="2"
                fontSize="x-small"
                onClick={() => deleteOption(index)}
              >
                <CloseIcon />
              </InputRightElement>
            </InputGroup>
          </Flex>
        ))}
        <AddOption addNewOption={addNewOption} />
      </Flex>
    </>
  );
}
