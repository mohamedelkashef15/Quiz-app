import { INextButton } from "./interfaces";

function NextButton({ dispatch, answer }: INextButton) {
  if (answer === null) return null;

  return (
    <div className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
      Next
    </div>
  );
}

export default NextButton;
