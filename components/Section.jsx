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
    const newQuestions = [...questions];

    newQuestions.push({
      type: "Single Choice",
      positiveMarks: 0,
      negativeMarks: 0,
    });

    handleSectionQuestionsChange(sectionIndex, newQuestions);
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions = newQuestions.filter((_, idx) => idx !== index);

    setFocusedQuestionIndex(index - 1);
    handleSectionQuestionsChange(sectionIndex, newQuestions);
  };

  const duplicateQuestion = (question, index) => {
    const newQuestions = [...questions];

    // duplicate the question's data depending on the question type
    newQuestions.splice(
      index + 1,
      0,
      question.type === "Paragraph"
        ? {
            type: question.type,
            positiveMarks: question.positiveMarks,
            negativeMarks: question.negativeMarks,
          }
        : {
            type: question.type,
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
        <span className="cusror-pointer" onClick={addNewQuestion}>
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="13" r="11" fill="#F2D8D5" />
            <path
              d="M11.8701 11.9917H16.0332V13.7861H11.8701V18.5029H9.96289V13.7861H5.7998V11.9917H9.96289V7.63379H11.8701V11.9917Z"
              fill="#733D47"
            />
          </svg>
        </span>
      </Tooltip>
      <Tooltip label="Duplicate this question">
        <span
          className="cusror-pointer"
          onClick={() => duplicateQuestion(question, questionIndex)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1668 15.6668V4.66683C21.1668 4.1806 20.9737 3.71428 20.6299 3.37047C20.286 3.02665 19.8197 2.8335 19.3335 2.8335H8.3335C7.84727 2.8335 7.38095 3.02665 7.03713 3.37047C6.69332 3.71428 6.50016 4.1806 6.50016 4.66683V15.6668C6.50016 16.1531 6.69332 16.6194 7.03713 16.9632C7.38095 17.307 7.84727 17.5002 8.3335 17.5002H19.3335C19.8197 17.5002 20.286 17.307 20.6299 16.9632C20.9737 16.6194 21.1668 16.1531 21.1668 15.6668ZM2.8335 6.50016V19.3335C2.8335 19.8197 3.02665 20.286 3.37047 20.6299C3.71428 20.9737 4.1806 21.1668 4.66683 21.1668H17.5002V19.3335H4.66683V6.50016"
              fill="#F2D8D5"
            />
          </svg>
        </span>
      </Tooltip>
      <Tooltip label="Delete this question">
        <span
          className="cusror-pointer"
          onClick={() => {
            questionIndex === 0 ? null : deleteQuestion(questionIndex);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99988 19C5.99988 20.1 6.89988 21 7.99988 21H15.9999C17.0999 21 17.9999 20.1 17.9999 19V7H5.99988V19ZM18.9999 4H15.4999L14.4999 3H9.49988L8.49988 4H4.99988V6H18.9999V4Z"
              fill="#F2D8D5"
            />
          </svg>
        </span>
      </Tooltip>
      <Tooltip label="Add new section">
        <span className="cusror-pointer" onClick={addNewSection}>
          <svg
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_2_151)">
              <circle cx="14.4996" cy="11.5" r="9.9" fill="#F2D8D5" />
            </g>
            <path
              d="M19.0283 10.0508H10.8838V8.47852H19.0283V10.0508ZM19.0283 14.1035H10.8838V12.541H19.0283V14.1035Z"
              fill="#733D47"
            />
            <defs>
              <filter
                id="filter0_d_2_151"
                x="0.599609"
                y="1.59998"
                width="27.8"
                height="27.8"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_151"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_151"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </span>
      </Tooltip>
      <Tooltip label="Delete this setion">
        <span
          onClick={() => {
            sectionIndex === 0 ? null : deleteSection(sectionIndex);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="13" r="11" fill="#F2D8D5" />
            <path
              d="M12.0946 13.2734L14.9876 16.2671L13.6972 17.514L10.8043 14.5204L7.41241 17.7981L6.08706 16.4266L9.47892 13.1489L6.58597 10.1552L7.87635 8.90823L10.7693 11.9019L13.9031 8.87358L15.2284 10.2451L12.0946 13.2734Z"
              fill="#733D47"
            />
          </svg>
        </span>
      </Tooltip>
    </Flex>
  );
}
