import axios from 'axios';
import log from '../utils/logger';
export const getJobData = async () => {
  try {
    let res = await axios.get(
      'http://dev3.dansmultipro.co.id/api/recruitment/positions.json'
    );

    return { data: res.data, err: false };
  } catch (err: any) {
    return { msg: err, err: true };
  }
};

export const getJobDetail = async (id: string) => {};

export const searchJob = async (query: jobQuery) => {
  let limitPerPage = 10;
  if (query.limit != 0) {
    limitPerPage = query.limit; //default if no query for limit
  }

  let resp = await getJobData();
  let data = resp.data;

  //filter full time
  if (query.fulltime) {
    data = data.filter((item: jobData) => {
      return item.type == 'Full Time';
    });
  }

  //filter location
  if (query.location) {
    data = data.filter((item: jobData) => {
      return item.location.toLowerCase().includes(query.location.toLowerCase());
    });
  }

  //filter description
  if (query.description) {
    data = data.filter((item: jobData) => {
      return item.description
        .toLowerCase()
        .includes(query.description.toLowerCase());
    });
  }

  if (query.page != 0) {
    //if there is page
    data = data.slice(
      limitPerPage * (query.page - 1),
      limitPerPage * query.page
    );
  } else if (query.limit != 0) {
    //if there's only limit
    data = data.slice(0, query.limit);
  }

  //   log.info(data.length);

  return data;
};
