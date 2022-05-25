import { RequestHandler, Request, Response } from 'express';
import log from '../utils/logger';
import { searchJob } from '../services/jobs.services';

const getJobList: RequestHandler = async (req: Request, res: Response) => {
  log.info('get Job List');

  //process query
  let fulltime;
  if (req.query.full_time !== undefined && req.query.full_time !== null) {
    fulltime = req.query.full_time == 'true' ? true : false;
  }

  let query: jobQuery = {
    location: <string>req.query.location || '',
    fulltime: fulltime || false,
    description: <string>req.query.description || '',
    page: parseInt(<string>req.query.page) || 0,
    limit: parseInt(<string>req.query.limit) || 0,
  };

  //   log.info(query);

  let result = await searchJob(query);

  res.status(200).send({ err: false, data: result, msg: 'Success' });
  return;
};

const getJobDetail: RequestHandler = async (req: Request, res: Response) => {
  log.info('get Job Detail');

  res.status(400).send({ err: true, msg: 'Bad request' });
};

const jobs = { getJobList, getJobDetail };
export default jobs;
