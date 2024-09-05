import { IOptions } from "./interfaces";

function Options({ question, answer, dispatch }: IOptions) {
  const hasAnswered = answer !== null;
  // hasAnswered? (checkCorrectOpiton ? "correct": "wrong") : ""
  return (
    <div className="options">
      {question.options.map((option, index) => {
        const checkCorrectOption = question.correctOption === index;
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered ? (checkCorrectOption ? "correct" : "wrong") : ""
            }`}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
