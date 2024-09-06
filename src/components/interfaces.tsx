import { Dispatch } from "react";

export interface IState {
  questions: IQuestion[];
  status: string;
  index: number;
  answer: null | number;
  totalPoints: number;
}
export interface IQuestion {
  title: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}

export interface IQuestions {
  question: IQuestion;
  answer: null | number;
  dispatch: Dispatch<Action>;
}

export interface IOptions {
  question: IQuestion;
  answer: null | number;
  dispatch: Dispatch<Action>;
}

export interface INextButton {
  dispatch: Dispatch<Action>;
  answer: number | null;
}

export interface IProgress {
  index: number;
  totalPoints: number;
  numQuestions: number;
  maxPossiblePoints: number;
  answer: number | null;
}

export type Action =
  | { type: "dataRecived"; payload: IQuestion[] }
  | { type: "dataFailed"; error: string }
  | { type: "start" }
  | { type: "newAnswer"; payload: null | number; points?: number }
  | { type: "nextQuestion" };
