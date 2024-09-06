import { IFinishScreen } from "./interfaces";

function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }: IFinishScreen) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        🤦‍♂️ You scored <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong> ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
