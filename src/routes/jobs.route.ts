import { Router } from 'express';
import verifyJWT from '../middlewares/jwtAuth';
import jobs from '../controllers/jobs.controller';

const jobsRoute = Router();

jobsRoute.post('/list', verifyJWT, jobs.getJobList);
jobsRoute.post('/detail/:id', verifyJWT, jobs.getJobDetail);

export default jobsRoute;
