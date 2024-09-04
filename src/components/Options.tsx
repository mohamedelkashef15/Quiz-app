import { IOptions } from "./interfaces";

function Options({ question, answer, dispatch }: IOptions) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        const checkCorrectOption = index === question.correctOption ? "correct" : "wrong";
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? checkCorrectOption : ""}`}
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
