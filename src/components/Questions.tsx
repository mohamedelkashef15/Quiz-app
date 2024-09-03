// import { IQuestion } from "./interfaces";

import { IQuestion } from "./interfaces";

function Questions({ question }: { question: IQuestion }) {
  return (
    <div>
      <h4>{question.title}</h4>
      <div className="options">
        {question.options.map((option) => {
          return (
            <button className="btn btn-option" key={option}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
