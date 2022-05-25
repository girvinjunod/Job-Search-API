import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morganMiddleware from './middlewares/morgan';
import initRoute from './routes';

import log from './utils/logger';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(morganMiddleware);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

initRoute(app);

app.listen(port, () => {
  log.info(`Server is running at http://localhost:${port}`);
});
