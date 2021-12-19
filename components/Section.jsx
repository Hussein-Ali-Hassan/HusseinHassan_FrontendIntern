import { useState } from "react";
import { Tooltip, Flex } from "@chakra-ui/react";

import useFormContext from "@/context/FormContext";
import QuestionCard from "@/components/QuestionCard";

export default function Section({
  sectionIndex,
  questions,
  addNewSection,
  deleteSection,
}) {
  const { handleSectionQuestionsChange } = useFormContext();
  const [focusedQuestionIndex, setFocusedQuestionIndex] = useState(0);

  const addNewQuestion = () => {
    const newQuestions = JSON.parse(JSON.stringify(questions));

    newQuestions.push({
      type: "Single Choice",
      questionPrompt: "",
      positiveMarks: 0,
      negativeMarks: 0,
    });

    handleSectionQuestionsChange(sectionIndex, newQuestions);
  };

  const deleteQuestion = (index) => {
    const newQuestions = JSON.parse(JSON.stringify(questions));
    newQuestions = newQuestions.filter((_, idx) => idx !== index);

    setFocusedQuestionIndex(index - 1);
    handleSectionQuestionsChange(sectionIndex, newQuestions);
  };

  const duplicateQuestion = (question, index) => {
    const newQuestions = JSON.parse(JSON.stringify(questions));

    // duplicate the question's data depending on the question type
    newQuestions.splice(
      index + 1,
      0,
      question.type === "Paragraph"
        ? {
            type: question.type,
            questionPrompt: question.questionPrompt,
            positiveMarks: question.positiveMarks,
            negativeMarks: question.negativeMarks,
          }
        : {
            type: question.type,
            questionPrompt: question.questionPrompt,
            positiveMarks: question.positiveMarks,
            negativeMarks: question.negativeMarks,
            options: question.options
              ? JSON.parse(JSON.stringify(question.options))
              : null,
          }
    );

    handleSectionQuestionsChange(sectionIndex, newQuestions);
  };

  return (
    <>
      {questions.map((question, index) => (
        <div className="question-wrapper" key={index}>
          <QuestionCard
            setFocusedQuestionIndex={setFocusedQuestionIndex}
            sectionIndex={sectionIndex}
            questionIndex={index}
            type={question.type}
            questionPrompt={question.questionPrompt}
            positiveMarks={question.positiveMarks}
            negativeMarks={question.negativeMarks}
          />
          {focusedQuestionIndex === index && (
            <div className="side-menu">
              <SideMenu
                question={question}
                sectionIndex={sectionIndex}
                questionIndex={index}
                deleteQuestion={deleteQuestion}
                duplicateQuestion={duplicateQuestion}
                addNewQuestion={addNewQuestion}
                addNewSection={addNewSection}
                deleteSection={deleteSection}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

function SideMenu({
  question,
  sectionIndex,
  questionIndex,
  deleteQuestion,
  duplicateQuestion,
  addNewQuestion,
  addNewSection,
  deleteSection,
}) {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      bg="brand.900"
      px="2.5"
      py="2"
      rounded="md"
      height="170px"
    >
      <Tooltip label="Add new question">
        <img
          src="/icons/addIcon.svg"
          alt="add icon"
          width="24"
          height="24"
          className="cusror-pointer"
          onClick={addNewQuestion}
        />
      </Tooltip>
      <Tooltip label="Duplicate this question">
        <img
          src="/icons/duplicate.svg"
          alt="duplicate question"
          width="24"
          height="24"
          className="cusror-pointer"
          onClick={() => duplicateQuestion(question, questionIndex)}
        />
      </Tooltip>
      <Tooltip label="Delete this question">
        <img
          src="/icons/trashcan.svg"
          alt="delete question"
          width="24"
          height="24"
          className="cusror-pointer"
          onClick={() => {
            questionIndex === 0 ? null : deleteQuestion(questionIndex);
          }}
        />
      </Tooltip>
      <Tooltip label="Add new section">
        <img
          src="/icons/section.svg"
          alt="add section"
          width="28"
          height="28"
          className="cusror-pointer"
          onClick={addNewSection}
        />
      </Tooltip>
      <Tooltip label="Delete this setion">
        <img
          src="/icons/closeIcon.svg"
          alt="delete section"
          width="24"
          height="24"
          className="cusror-pointer"
          onClick={() => {
            sectionIndex === 0 ? null : deleteSection(sectionIndex);
          }}
        />
      </Tooltip>
    </Flex>
  );
}
