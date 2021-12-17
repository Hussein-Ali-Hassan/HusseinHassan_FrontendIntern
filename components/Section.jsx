import { v4 as uuidv4 } from "uuid";

import useFormContext from "@/context/FormContext";
import QuestionCard from "@/components/QuestionCard";

export default function Section() {
  const { questions, setQuestions } = useFormContext();

  const addNewQuestion = () => {
    const newQuestions = [...questions];

    newQuestions.push({
      id: uuidv4(),
      data: [
        {
          name: "",
          price: "",
        },
      ],
    });

    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, idx) => idx !== index));
  };

  const duplicateQuestion = (question, index) => {
    const newQuestions = [...questions];

    newQuestions.splice(index, 0, {
      id: uuidv4(),
      data: JSON.parse(JSON.stringify(question.data)), // to perform a deep copy
    });

    setQuestions(newQuestions);
  };

  return (
    <>
      {questions.map((question, index) => (
        <div className="question" key={question.id}>
          <QuestionCard options={question.data} questionIndex={index} />
          <button onClick={() => deleteQuestion(index)}>-</button>
          <button onClick={() => duplicateQuestion(question, index)}>
            duplicate
          </button>
        </div>
      ))}
      <hr />
      <button onClick={addNewQuestion}>+</button>
      <br />
      <br />
      <button onClick={() => console.log(questions)}>Submit</button>
    </>
  );
}
