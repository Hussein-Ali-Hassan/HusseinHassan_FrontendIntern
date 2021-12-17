import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      data: [
        {
          name: "",
          price: "",
        },
      ],
    },
  ]);

  const handleQuestionDataChange = (index, data) => {
    const newQuestions = [...questions];
    newQuestions[index].data = data;

    setQuestions(newQuestions);
  };

  return (
    <FormContext.Provider
      value={{ questions, setQuestions, handleQuestionDataChange }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default function useFormContext() {
  return useContext(FormContext);
}

const example = [
  {
    id: "12-212", // section id
    questions: [
      {
        id: "e3-3e3", // each question in the section
        type: "single choice",
        options: [1, 2, 3, 4],
      },
      {
        id: "r5-t65",
        type: "multiple choice",
        options: [1, 2, 3, 4, 5],
      },
      {
        id: "5t-88u",
        type: "paragraph",
        content: "",
      },
      {
        id: "t5t-5t",
        type: "file upload",
        file: "",
      },
    ],
  },
];
