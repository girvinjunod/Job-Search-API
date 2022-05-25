import { RequestHandler, Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../configs/auth.config";
import log from "../utils/logger";

const verifyJWT: RequestHandler = (req : Request, res : Response, next) => {
  try {
    let token;
    if (req.body.token) {
      token = req.body.token;
    } else if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).send({
        msg: "No token provided",
      });
    }
    if (!authConfig.token_secret) {
        log.error("No token secret provided");
      return res
        .status(500)
        .send("Internal server error");
    }

    jwt.verify(
      token,
      authConfig.token_secret,
      (err: any, decoded: any) => {
        if (err) {
          log.error(err.message);
          return res.status(401).json({
            msg: "Invalid token",
          });
        }
        req.username = decoded;
        next();
      }
    );
  } catch (err: any) {
    if (err.name !== "JsonWebTokenError") {
      log.error(err);
    } else {
      log.error("Invalid token", err.message);
    }
  }

};

export default verifyJWT;