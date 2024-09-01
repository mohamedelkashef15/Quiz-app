/*
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import ErrorMessage from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";

interface IState {
  questions: string[];
  status: string;
}

type Action = { type: "dataRecived"; payload: string[] } | { type: "dataFailed"; error: string };

const initialState: IState = {
  questions: [],
  // loading, ready, error
  status: "loading",
};

function reducer(state: IState, action: Action): IState {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;

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
        {status === "error" && <ErrorMessage />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
}

export default App;
*/
