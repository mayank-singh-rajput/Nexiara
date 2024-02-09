import { Request, Response } from "express";
import ResultRepository from "../database/repository/result";
import QuestionRepository from "../database/repository/question";
import { ICreateResult, IUpdateResult } from "../interfaces/result_interfaces";
import { FormatData, FormatError } from "../utils/parser";

const resultRepository = new ResultRepository();
const questionRepository = new QuestionRepository();

interface IQuestion {
  QuestionId: string;
  ChoosedOption: string;
}

class ResultService {
  // create Result
  async createResult(req: Request, res: Response) {
    try {
      const { userId, Questions }: { userId: string; Questions: IQuestion[] } = req.body;

      let total = 0;
      const overallResult: any[] = [];
      const categorialScore: any[] = [];

      for (const element of Questions) {
        // get question by ID
        const question = await questionRepository.getQuestionById(
          element.QuestionId
        );
        if (!question) throw new Error("Invalid question ID");

        const options = [
          question.option1,
          question.option2,
          question.option3,
          question.option4,
        ];

        let optionFound = false;
        for (const option of options) {
          if (option.value === element.ChoosedOption) {
            total += option.point;

            const existingCategoryScoreIndex = categorialScore.findIndex(
              (item) => item.category === question.category
            );
            if (existingCategoryScoreIndex !== -1) {
              categorialScore[existingCategoryScoreIndex].point += option.point;
            } else {
              categorialScore.push({
                category: question.category,
                point: option.point,
              });
            }

            overallResult.push({
              QuestionId: element.QuestionId,
              ChoosedOption: element.ChoosedOption,
              point: option.point,
            });
            optionFound = true;
            break;
          }
        }
        if (!optionFound) {
          throw new Error("Invalid option chosen");
        }
      }

      // Create Result
      const data: ICreateResult = {
        userId,
        total,
        overallResult,
        categorialScore,
      };

      const result = await resultRepository.createResult(data);
      if (!result) {
        return res.status(500).json({ error: "Result not created" });
      }

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // update Result
  async updateResult(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId, Questions }: { userId: string; Questions: IQuestion[] } =
        req.body;

      let total = 0;
      const overallResult: any[] = [];
      const categorialScore: any[] = [];

      for (const element of Questions) {
        // get question by ID
        const question = await questionRepository.getQuestionById(
          element.QuestionId
        );
        if (!question) throw new Error("Invalid question ID");

        const options = [
          question.option1,
          question.option2,
          question.option3,
          question.option4,
        ];

        let optionFound = false;
        for (const option of options) {
          if (option.value === element.ChoosedOption) {
            total += option.point;

            const existingCategoryScoreIndex = categorialScore.findIndex(
              (item) => item.category === question.category
            );
            if (existingCategoryScoreIndex !== -1) {
              categorialScore[existingCategoryScoreIndex].point += option.point;
            } else {
              categorialScore.push({
                category: question.category,
                point: option.point,
              });
            }

            overallResult.push({
              QuestionId: element.QuestionId,
              ChoosedOption: element.ChoosedOption,
              point: option.point,
            });
            optionFound = true;
            break;
          }
        }
        if (!optionFound) {
          throw new Error("Invalid option chosen");
        }
      }

      // Create Result
      const data: IUpdateResult = {
        userId,
        total,
        overallResult,
        categorialScore,
      };

      const result = await resultRepository.updateReslutById(id, data);
      if (!result) {
        return res.status(500).json({ error: "Result not created" });
      }

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // get Result By Id
  async getResultById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await resultRepository.getResultById(id);
      if (!result) {
        return res.status(500).json({ error: "Result not Founded" });
      }

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // get Result
  async getResult(req: Request, res: Response) {
    try {
      const { _id: userId } = req.user;

      const result = await resultRepository.getResultByUserId(userId);
      if (!result) {
        return res.status(500).json({ error: "Result not Founded" });
      }      

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // delete Result By Id
  async deleteResultById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await resultRepository.deleteResultById(id);
      if (!result) {
        return res.status(500).json({ error: "Result not Founded" });
      }

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }
}

export default ResultService;
