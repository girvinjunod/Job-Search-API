import { Router } from 'express';
// import verifyJWT from '../middlewares/jwtAuth';
import account from '../controllers/account.controller';

const accountRoute = Router();

accountRoute.post('/register', account.register);
accountRoute.post('/login', account.login);

export default accountRoute;
