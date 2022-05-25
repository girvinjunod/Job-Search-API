import { RequestHandler, Request, Response } from 'express';
import log from '../utils/logger';

const getJobList: RequestHandler = async (req: Request, res: Response) => {
  log.info('get Job List');

  res.status(400).send({ error: true, msg: 'Bad request' });
  return;
};

const getJobDetail: RequestHandler = async (req: Request, res: Response) => {
  log.info('get Job Detail');

  res.status(400).send({ err: true, msg: 'Bad request' });
};

const jobs = { getJobList, getJobDetail };
export default jobs;
