import { Express } from 'express';
import ResultService from '../services/result';
import ResultMiddleware from '../middlewares/result';
import { checkToken } from './middlewares/token';

export default (app: Express) => {
    const resultService = new ResultService();
    const resultMiddleware = new ResultMiddleware();

    // create result 
    app.post('/create/result', checkToken, resultMiddleware.createResult, resultService.createResult);

    // update result
    app.put('/update/result/:id', checkToken, resultMiddleware.updateResult, resultService.updateResult);

    // get result by Id
    app.get('/get/result/:id', checkToken, resultMiddleware.getResultById, resultService.getResultById);

    // get result by userId
    app.get('/get/user/result', checkToken, resultService.getResult);

    // delete result by Id
    app.delete('/delete/result/:id', checkToken, resultMiddleware.deleteResultById, resultService.deleteResultById);
}