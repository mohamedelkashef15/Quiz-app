import { IFinishScreen } from "./interfaces";

function FinishScreen({ points, maxPossiblePoints, highScore }: IFinishScreen) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        🤦‍♂️ You scored <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong> ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
    </>
  );
}

export default FinishScreen;
