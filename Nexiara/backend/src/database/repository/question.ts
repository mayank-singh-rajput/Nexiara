import { Question } from '../models/index';
import { ICreateQuestion, IGetQuestions, IUpdateQuestion, IDeleteQuestion } from '../../interfaces/question_interfaces';

class QuestionRepository {
    // create Question
    async createQuestion(data: ICreateQuestion): Promise<IGetQuestions> {
        try {
            const question = await Question.create(data);
            return question.toObject() as IGetQuestions;
        } catch (error) {
            console.error('Error creating Question:', error);
            throw new Error('Question creation failed');
        }
    }

    // update Question by id
    async updateQuestionById(id: string, data: IUpdateQuestion): Promise<IGetQuestions> {
        try {
            const updateQuestion = await Question.findByIdAndUpdate(id, data, { new: true });

            if (!updateQuestion) {
                throw new Error(`Question with id ${id} not found`);
            }
            return updateQuestion.toObject() as IGetQuestions;
        } catch (error) {
            console.error('Error updating Question:', error);
            throw new Error('Question updation failed');
        }
    }

    // get Question by id
    async getQuestionById(id: string): Promise<IGetQuestions> {
        try {
            const question = await Question.findById(id);
            if (!question) {
                throw new Error(`Question with id ${id} not found`);
            }
            return question.toObject() as IGetQuestions;
        } catch (error) {
            console.error('Error getting Question:', error);
            throw new Error('Question not found');
        }
    }

    // get all Question
    async getQuestion(): Promise<IGetQuestions[]> {
        try {
            const questions = await Question.find();
            return questions.map(question => question.toObject()) as IGetQuestions[];
        } catch (error) {
            console.error('Error getting Question:', error);
            throw new Error('Question not found');
        }
    }

    // delete Question by id
    async deleteQuestionById(id: string): Promise<any> {
        try {
            const question = await Question.findByIdAndDelete(id);
            if (!question) {
                throw new Error(`Question with id ${id} not found`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting Question:', error);
            throw new Error('Question deletion failed');
        }
    }
}

export default QuestionRepository;