import { RequestHandler, Request, Response } from 'express';
import log from '../utils/logger';
import { searchJob, getJobByID } from '../services/jobs.services';

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
  if (result) {
    res.status(200).send({ err: false, data: result, msg: 'Success' });
  } else {
    res.status(404).send({ err: true, msg: 'Job Not Found' });
  }
  return;
};

const getJobDetail: RequestHandler = async (req: Request, res: Response) => {
  log.info('get Job Detail');
  let id = <string>req.params.id;
  //   log.info(id);
  if (!id || id == ' ') {
    res.status(400).send({ err: true, msg: 'id is empty' });
    return;
  }

  let resp = await getJobByID(id);
  if (resp) {
    res.status(200).send({ data: resp, err: false });
  } else {
    res.status(404).send({ err: true, msg: 'Job Not Found' });
  }
  return;
};

const jobs = { getJobList, getJobDetail };
export default jobs;
