import { ReturnData, ReturnStatus } from '../common/common';
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { appConfig } from '../common/config';
const SECRET_KEY = appConfig.secretKey;


export class AuthRoutes {

  public static async getUserIdFromToken(token: any) {
    try {
      let decoded: any = await jwt.decode(token.toString());
      let userId = (decoded) ? decoded.userLoginModel[0].userId : null;
      return userId
    } catch (err) {
      throw err;
    }
  }

  public isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next()
      return
    }

    const bearerHeader = req.headers["authorization"] || ` ${req.query['token']}`;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      let token = bearerToken;
      try {
        var decoded = jwt.verify(token.toString(), SECRET_KEY);
        if (decoded) {
          next()
        }
      } catch (err) {
        const results: ReturnData = new ReturnData([], 'Authentication Error');
        res.status(401).json(results);
      }
    } else {
      console.log("6");

        const results: ReturnData = new ReturnData([], 'Authentication Error');
      res.status(401).json(results);
    }
  }

  public async getToken(req: Request) {
    try {
      const bearerHeader = req.headers["authorization"] || ` ${req.query['token']}`;
      if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        let token = bearerToken;
        return token;
      }
    } catch (err) {
      throw err;
    }
  }
}