import accountRoute from './account.route';
import jobsRoute from './jobs.route';

export default function initRoute(app: any) {
  app.use('/', accountRoute);
  app.use('/jobs', jobsRoute);
}
