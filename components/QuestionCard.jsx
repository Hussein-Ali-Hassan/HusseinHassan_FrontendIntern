import { useState } from "react";
import DropDown from "./QuestionsTypes/DropDown";

export default function QuestionCard() {
  const [type, setType] = useState("Single Choice");

  return (
    <div className="table">
      <div className="table-title">Question Card</div>
      <div className="table-content">
        <div className="table-header">
          <div className="table-row">
            <DropDown setType={setType} />
          </div>
        </div>
        <div className="table-body">
          <div className="table-row">{type}</div>
        </div>
      </div>
    </div>
  );
}
