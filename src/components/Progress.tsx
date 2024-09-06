import { IProgress } from "./interfaces";

function Progress({ index, maxPossiblePoints, numQuestions, totalPoints, answer }: IProgress) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        <strong> {totalPoints} </strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
