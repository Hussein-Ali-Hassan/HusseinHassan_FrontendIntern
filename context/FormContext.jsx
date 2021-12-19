import { createContext, useState, useContext } from "react";

const FormContext = createContext();

// I decided to have a single source of truth and to manage the form in way
// that the changes are live, not like having a submit button

// this context holds the form data and provides the children, where each
// children has its own state and updates the context

export const FormProvider = ({ children }) => {
  // initialy we start with one section and one 'single choice' question
  const [sections, setSections] = useState([
    {
      questions: [
        {
          type: "Single Choice",
          questionPrompt: "",
          positiveMarks: null,
          negativeMarks: null,
        },
      ],
    },
  ]);

  // when a question is removed, added or its data is modified
  const handleSectionQuestionsChange = (sectionIndex, newQuestions) => {
    const newSections = JSON.parse(JSON.stringify(sections));
    newSections[sectionIndex].questions = newQuestions;

    setSections(newSections);
  };

  // for each question type (single choice, multiple ...)
  const handleQuestionTypeChange = (sectionIndex, questionIndex, newType) => {
    const newSections = JSON.parse(JSON.stringify(sections));
    newSections[sectionIndex].questions[questionIndex].type = newType;

    // when switching question type;
    // remove 'options' property if it exists
    newSections[sectionIndex].questions[questionIndex].options &&
      delete newSections[sectionIndex].questions[questionIndex].options;

    // clear the question's prompt
    newSections[sectionIndex].questions[questionIndex].questionPrompt = "";

    setSections(newSections);
  };

  // each question in the question card
  const handleQuestionPromptChange = (
    sectionIndex,
    questionIndex,
    questionPrompt
  ) => {
    const newSections = JSON.parse(JSON.stringify(sections));
    newSections[sectionIndex].questions[questionIndex].questionPrompt =
      questionPrompt;

    setSections(newSections);
  };

  // total mark & negative marks in each question card
  const handleQuestionMarksChange = (
    sectionIndex,
    questionIndex,
    positiveMarks,
    negativeMarks
  ) => {
    const newSections = JSON.parse(JSON.stringify(sections));
    newSections[sectionIndex].questions[questionIndex].positiveMarks =
      positiveMarks;
    newSections[sectionIndex].questions[questionIndex].negativeMarks =
      negativeMarks;

    setSections(newSections);
  };

  // when a question's options id added, removed or its data is edited
  const handleSingleAndMultipleChoiceQuestionChange = (
    sectionIndex,
    questionIndex,
    options
  ) => {
    const newSections = JSON.parse(JSON.stringify(sections));
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
        handleQuestionPromptChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default function useFormContext() {
  return useContext(FormContext);
}
