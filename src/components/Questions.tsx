import { IQuestions } from "./interfaces";
import Options from "./Options";

function Questions({ question, answer, dispatch }: IQuestions) {
  return (
    <div>
      <h4>{question.title}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Questions;
