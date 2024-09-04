import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { Action, IQuestion } from "./components/interfaces";
import { IState } from "./components/interfaces";
import ErrorMessage from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

const initialState: IState = {
  questions: [],
  // loading, ready, start, error
  status: "loading",
  index: 0,
  answer: null,
  totalPoints: 0,
};

/*
  - if selected option equal correct option then add points to total points 
*/

function reducer(state: IState, action: Action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        totalPoints:
          action.payload === question?.correctOption ? (state.totalPoints += question.points) : state.totalPoints,
      };
    }

    default:
      throw new Error("Unkown Action");
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data: IQuestion[] = await res.json();
        dispatch({ type: "dataRecived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", error: (err as Error).message });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "dataFailed" && <ErrorMessage />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && <Questions question={questions[index]} answer={answer} dispatch={dispatch} />}
      </Main>
    </div>
  );
}

export default App;
