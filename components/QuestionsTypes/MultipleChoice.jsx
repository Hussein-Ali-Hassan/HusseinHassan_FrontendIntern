import { useState } from "react";
import {
  Flex,
  Text,
  Box,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import useFormContext from "@/context/FormContext";

const initialOptions = [
  {
    answer: "",
    isCorrect: false,
  },
];

export default function MultipleChoice({ sectionIndex, questionIndex }) {
  const { sections, handleSingleAndMultipleChoiceQuestionChange } =
    useFormContext();
  // if exists -> use the options from the duplicated question
  // else -> stick to the initialOptions
  const [options, setOptions] = useState(
    sections[sectionIndex].questions[questionIndex].options || initialOptions
  );

  const handleOptionsChange = (event) => {
    const newOptions = [...options];
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

  const addNewOption = () => {
    const newOptions = [...options];
    newOptions.push({ answer: "", isCorrect: false });

    setOptions(newOptions);
  };

  const deleteOption = (index) => {
    const newOptions = [...options];
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
        <Text mb="6">Question goes here</Text>

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
            <InputGroup>
              <Input
                placeholder={`Option ${index + 1}`}
                name="answer"
                data-id={index}
                type="text"
                value={item.answer}
                onChange={handleOptionsChange}
              />
              <InputRightElement onClick={() => deleteOption(index)}>
                <CloseIcon />
              </InputRightElement>
            </InputGroup>
          </Flex>
        ))}
        <InputGroup>
          <Input placeholder="Add option" />
          <InputRightElement onClick={addNewOption}>
            <AddIcon />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </>
  );
}
