import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function AddOption({ addNewOption }) {
  return (
    <Flex>
      <InputGroup ml="30px">
        <Input colorScheme="brand" placeholder="Add option" isDisabled />
        <InputRightElement
          bg="brand.600"
          rounded="full"
          color="white"
          width="26px"
          height="26px"
          mt="2"
          mr="2"
          fontSize="sm"
          onClick={addNewOption}
        >
          <AddIcon />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
