export interface ICreateResult {
  userId: string;
  total: number;
  overallResult: {
    QuestionId: string;
    ChoosedOption: string;
    point: number;
  }[];
  categorialScore: {
    category: string,
    point: number,
  }[];
}

export interface IGetResults {
  _id: string;
  userId: string;
  total: number;
  overallResult: {
    QuestionId: string;
    ChoosedOption: string;
    point: number;
  }[];
  categorialScore: {
    category: string,
    point: number,
  }[];
}

export interface IUpdateResult {
  userId?: string;
  total?: number;
  overallResult?: {
    QuestionId?: string;
    ChoosedOption?: string;
    point?: number;
  }[];
  categorialScore?: {
    category?: string,
    point?: number,
  }[];
}

export interface IDeleteResult {
  _id: string;
}
