export interface ICreateQuestion {
  Question: string;
  category: string;
  option1: {
    value: string;
    point: number;
  };
  option2: {
    value: string;
    point: number;
  };
  option3: {
    value: string;
    point: number;
  };
  option4: {
    value: string;
    point: number;
  };
}

export interface IGetQuestions {
  _id: string;
  Question: string;
  category: string;
  option1: {
    value: string;
    point: number;
  };
  option2: {
    value: string;
    point: number;
  };
  option3: {
    value: string;
    point: number;
  };
  option4: {
    value: string;
    point: number;
  };
}

export interface IUpdateQuestion {
  Question?: string;
  category?: string;
  option1?: {
    value?: string;
    point?: number;
  };
  option2?: {
    value?: string;
    point?: number;
  };
  option3?: {
    value?: string;
    point?: number;
  };
  option4?: {
    value?: string;
    point?: number;
  };
}

export interface IDeleteQuestion {
  _id: string;
}
