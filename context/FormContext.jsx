import { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  // initialy we start with one section and one 'single choice' question
  const [sections, setSections] = useState([
    {
      questions: [
        {
          type: "Single Choice",
          positiveMarks: 0,
          negativeMarks: 0,
        },
      ],
    },
  ]);

  const handleSectionQuestionsChange = (sectionIndex, newQuestions) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions = newQuestions;

    setSections(newSections);
  };

  const handleQuestionTypeChange = (sectionIndex, questionIndex, newType) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex].type = newType;

    // when switching question type;
    // remove options property if it exists
    newSections[sectionIndex].questions[questionIndex].options &&
      delete newSections[sectionIndex].questions[questionIndex].options;

    setSections(newSections);
  };

  const handleQuestionMarksChange = (
    sectionIndex,
    questionIndex,
    positiveMarks,
    negativeMarks
  ) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex].positiveMarks =
      positiveMarks;
    newSections[sectionIndex].questions[questionIndex].negativeMarks =
      negativeMarks;

    setSections(newSections);
  };

  const handleSingleAndMultipleChoiceQuestionChange = (
    sectionIndex,
    questionIndex,
    options
  ) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex].options = options;

    setSections(newSections);
  };

  return (
    <FormContext.Provider
      value={{
        sections,
        setSections,
        handleSectionQuestionsChange,
        handleQuestionTypeChange,
        handleSingleAndMultipleChoiceQuestionChange,
        handleQuestionMarksChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default function useFormContext() {
  return useContext(FormContext);
}
