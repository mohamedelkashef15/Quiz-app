import { Action } from "../App";

interface IStartScreen {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
}

function StartScreen({ numQuestions, dispatch }: IStartScreen) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
