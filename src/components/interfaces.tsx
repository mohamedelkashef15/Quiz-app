export interface IState {
  questions: IQuestion[];
  status: string;
  index: number;
}
export interface IQuestion {
  title: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}

export type Action =
  | { type: "dataRecived"; payload: IQuestion[] }
  | { type: "dataFailed"; error: string }
  | { type: "start" };
