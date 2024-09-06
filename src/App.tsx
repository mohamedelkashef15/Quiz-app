import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { Action, IQuestion } from "./components/interfaces";
import { IState } from "./components/interfaces";
import ErrorMessage from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

const initialState: IState = {
  questions: [],
  // loading, ready, start, error
  status: "loading",
  index: 0,
  answer: null,
  totalPoints: 0,
  highScore: 0,
  secondRemaining: null,
};

function reducer(state: IState, action: Action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", secondRemaining: state.questions.length * SECS_PER_QUESTION };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        totalPoints:
          question?.correctOption === action.payload ? (state.totalPoints += question.points) : state.totalPoints,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish": {
      const checkHighScore = state.totalPoints > state.highScore ? state.totalPoints : state.highScore;
      return { ...state, status: "finished", highScore: checkHighScore };
    }
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready", highScore: state.highScore };

    case "tick":
      return {
        ...state,
        // if true and not null then decrease it by 1
        secondRemaining: state.secondRemaining && state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? (state.status = "finished") : state.status,
      };
    default:
      throw new Error("Unkown Action");
  }
}

function App() {
  const [{ questions, status, index, answer, totalPoints, highScore, secondRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);

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
        {status === "restart" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              maxPossiblePoints={maxPossiblePoints}
              totalPoints={totalPoints}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Questions question={questions[index]} answer={answer} dispatch={dispatch} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            <Footer>
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxPossiblePoints={maxPossiblePoints}
            points={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
