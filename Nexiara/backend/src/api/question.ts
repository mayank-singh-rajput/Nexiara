import { Express } from 'express';
import QuestionService from '../services/question';
import QuestionMiddleware from '../middlewares/question';
import { checkToken } from './middlewares/token';

export default (app: Express) => {
    const questionService = new QuestionService();
    const questionMiddleware = new QuestionMiddleware();

    // create question 
    app.post('/create/question', checkToken, questionMiddleware.createQuestion, questionService.createQuestion);

    // update question
    app.put('/update/question/:id', checkToken, questionMiddleware.updateQuestion, questionService.updateQuestion);

    // get question by Id
    app.get('/get/question/:id', checkToken, questionMiddleware.getQuestionById, questionService.getQuestionById);

    // get question
    app.get('/get/all/question', checkToken, questionService.getQuestion);

    //delete question by Id
    app.delete('/delete/question', checkToken, questionMiddleware.deleteQuestionById, questionService.deleteQuestionById);
}