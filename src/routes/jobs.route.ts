import { Router } from 'express';
import verifyJWT from '../middlewares/jwtAuth';
import jobs from '../controllers/jobs.controller';

const jobsRoute = Router();

jobsRoute.get('/list', verifyJWT, jobs.getJobList);
jobsRoute.get('/detail/:id', verifyJWT, jobs.getJobDetail);

export default jobsRoute;
