import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import Question from "./components/Question";

interface IState {
  questions: string[];
  status: string;
}

export type Action =
  | { type: "dataRecived"; payload: string[] }
  | { type: "dataFailed"; error: string }
  | { type: "start" };

const initialState = {
  questions: [],
  // loading, ready, error
  status: "loading",
};

function reducer(state: IState, action: Action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };

    default:
      throw new Error("Unkown Action");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
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
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "failed" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}

export default App;
