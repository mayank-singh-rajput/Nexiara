import { Request, Response } from "express";
import QuestionRepository from "../database/repository/question";
import {
  ICreateQuestion,
  IUpdateQuestion,
} from "../interfaces/question_interfaces";
import { FormatData, FormatError } from "../utils/parser";

const questionRepository = new QuestionRepository();

interface IOptions {
  value: string;
  point: number;
}

class QuestionService {
  // create Question
  async createQuestion(req: Request, res: Response) {
    try {
      const {
        Question,
        category,
        options,
      }: { Question: string; category: string; options: IOptions[] } = req.body;

      // Create Question
      const data: ICreateQuestion = {
        Question,
        category,
        option1: options[0] || null,
        option2: options[1] || null,
        option3: options[2] || null,
        option4: options[3] || null,
      };

      const result = await questionRepository.createQuestion(data);
      if (!result) {
        return res.status(500).json({ error: "Question not created" });
      }

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // update Question
  async updateQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        Question,
        category,
        options,
      }: { Question: string; category: string; options: IOptions[] } = req.body;

      // Create Question
      const data: IUpdateQuestion = {
        Question,
        category,
        option1: options[0] || null,
        option2: options[1] || null,
        option3: options[2] || null,
        option4: options[3] || null,
      };

      const result = await questionRepository.updateQuestionById(id, data);
      if (!result) {
        return res.status(500).json({ error: "Question not founded" });
      }

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // get Question By Id
  async getQuestionById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await questionRepository.getQuestionById(id);
      if (!result) {
        return res.status(500).json({ error: "Question not Founded" });
      }

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // get question
  async getQuestion(req: Request, res: Response) {
    try {      
      const result = await questionRepository.getQuestion();
      if (!result) {
        return res.status(500).json({ error: "Question not Founded" });
      }      

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // delete Question By Id
  async deleteQuestionById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await questionRepository.deleteQuestionById(id);
      if (!result) {
        return res.status(500).json({ error: "Question not Founded" });
      }

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }
}

export default QuestionService;
