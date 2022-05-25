import { RequestHandler, Request, Response } from 'express';
import log from '../utils/logger';
import { createAccount } from '../services/account.services';
import { findOneAccountByUsername } from '../services/account.services';
import { checkPassword } from '../services/account.services';
import { createJWTToken } from '../services/auth.services';

const register: RequestHandler = async (req: Request, res: Response) => {
  log.info('Register Account');
  let result = await createAccount(req.body);

  if (result) {
    res.status(200).send({ msg: 'Account created' });
  } else {
    res.status(400).send({ error: true, msg: 'Username already exist' });
  }
  return;
};

const login: RequestHandler = async (req: Request, res: Response) => {
  log.info('Login Account');
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: true, msg: 'Username or password is empty' });
    return;
  }

  let account = await findOneAccountByUsername(username);
  if (!account) {
    res.status(400).send({ error: true, msg: 'Username not exist' });
    return;
  }

  let isValid = await checkPassword(password, account.password);
  if (!isValid) {
    res.status(400).send({ error: true, msg: 'Password is incorrect' });
    return;
  }
  let token = createJWTToken(username);

  res.status(200).send({ token: token, msg: 'Login successful' });
};

const account = { register, login };
export default account;
