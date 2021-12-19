import { Select } from "@chakra-ui/react";

const types = ["Single Choice", "Multiple Choice", "Paragraph"];

export default function QuestionsTypes({ type, handleTypeChange }) {
  return (
    <Select
      onChange={(e) => handleTypeChange(e.target.value)}
      defaultValue={type}
      variant="filled"
    >
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </Select>
  );
}
