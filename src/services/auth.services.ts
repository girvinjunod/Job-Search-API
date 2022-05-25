import authConfig from "../configs/auth.config";
import { sign } from "jsonwebtoken";

export function createJWTToken(username: string) {
    try {
      if (!authConfig.token_secret) {
        throw Error("Secret not provided!");
      }
      const accessToken = sign({ username: username }, authConfig.token_secret, {
        expiresIn: authConfig.token_expire,
      });
  
      return accessToken;

    } catch (err: any) {
      throw err;
    }
  }
