import React from "react";
import SingleQuestion from "./questions/SingleQuestion"


const QuestionContainer = () => {
  return (
    <div>
      <div className="collapse bg-secondary">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">View Q & A</div>
        <div className="collapse-content">
          {/* <p>hello</p> */}
          <SingleQuestion anonymous = {false}/>
          <SingleQuestion />
        </div>
      </div>
    </div>
  );
};

export default QuestionContainer;
