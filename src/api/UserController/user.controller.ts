import { ProgressType, StatusCode, ReturnStatus, ReturnData } from '../../common/common';
import { userModel } from "../../model/UserModel/user-model";
import { Request, Response, NextFunction } from "express";
import { MSGS } from "./user.constants";
import { UserRepository } from "../../repository/userRepository/user.repository";
import _ = require('lodash');


export class UserController {

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      let model: userModel = req.body;

      if (_.isEmpty(req.body) === true) {

        const results: ReturnData = new ReturnData({}, 'Invalid Request');
        res.status(StatusCode.badRequest).json(results);

      } else {

        const repositoryProgress = new UserRepository();

        let repositoryResult = await repositoryProgress.createUser(model);

        if (repositoryResult === ProgressType.InvalidProcess) {

          const results: ReturnData = new ReturnData([], MSGS.UNSUCCESS);
          res.status(StatusCode.success).json(results);

        }
        else {
          const results: ReturnData = new ReturnData({}, MSGS.INSERT_SUCCESS);
          res.status(StatusCode.success).json(results);

        }
      }
    } catch (e) {

      const results: ReturnData = new ReturnData([], e.message);
      res.status(StatusCode.InternalServerError).json(results);

    }
  }

  public async userAuthentication(req: Request, res: Response, next: NextFunction) {
    try {
      let model: userModel = req.body;

      if (_.isEmpty(req.body) === true) {

        const results: ReturnData = new ReturnData({}, 'Invalid Request');
        res.status(StatusCode.badRequest).json(results);

      } else {

        const repositoryProgress = new UserRepository();

        let repositoryResult = await repositoryProgress.userAuth(model);

        if (repositoryResult === ProgressType.InvalidUserData) {

          const results: ReturnData = new ReturnData([], MSGS.UNSUCCESS);
          res.status(StatusCode.noDataFound).json(results);

        }
        else {
          const results: ReturnData = new ReturnData(repositoryResult, MSGS.Data_Found);
          res.status(StatusCode.success).json(results);

        }
      }
    } catch (e) {

      const results: ReturnData = new ReturnData([], e.message);
      res.status(StatusCode.InternalServerError).json(results);

    }
  }

  public async logOutUser(req: Request, res: Response, next: NextFunction) {
    try {
      let model: userModel = req.body;

      if (_.isEmpty(req.body) === true) {

        const results: ReturnData = new ReturnData({}, 'Invalid Request');
        res.status(StatusCode.badRequest).json(results);

      } else {

        const repositoryProgress = new UserRepository();

        let repositoryResult: any = await repositoryProgress.logOutUser(model);

        if (repositoryResult === ProgressType.InvalidUserData) {

          const results: ReturnData = new ReturnData([], MSGS.UNSUCCESS);
          res.status(StatusCode.success).json(results);

        }
        else {
          const results: ReturnData = new ReturnData({}, MSGS.LOG_OUT);
          res.status(StatusCode.success).json(results);

        }
      }
    } catch (e) {

      const results: ReturnData = new ReturnData([], e.message);
      res.status(StatusCode.InternalServerError).json(results);

    }
  }

  public async getArticles(req: Request, res: Response, next: NextFunction) {
    try {

      const repositoryProgress = new UserRepository();

      let repositoryResult: any = await repositoryProgress.getArticlesDetails();

      if (repositoryResult === ProgressType.NoDataFound) {

        const results: ReturnData = new ReturnData([], MSGS.NO_DATA_FOUND);
        res.status(StatusCode.noDataFound).json(results);

      }
      else {
        const results: ReturnData = new ReturnData(repositoryResult, MSGS.Data_Found);
        res.status(StatusCode.success).json(results);
      }
    } catch (e) {

      const results: ReturnData = new ReturnData([], e.message);
      res.status(StatusCode.InternalServerError).json(results);

    }
  }

  public async getParticularArticles(req: Request, res: Response, next: NextFunction) {
    try {

      let paramValue:any = req.params.id;

      const repositoryProgress = new UserRepository();

      let repositoryResult: any = await repositoryProgress.getParticularArticlesDetails(paramValue);

      if (repositoryResult === ProgressType.NoDataFound) {

        const results: ReturnData = new ReturnData([], MSGS.NO_DATA_FOUND);
        res.status(StatusCode.noDataFound).json(results);

      }
      else {
        const results: ReturnData = new ReturnData(repositoryResult, MSGS.Data_Found);
        res.status(StatusCode.success).json(results);
      }
    } catch (e) {

      const results: ReturnData = new ReturnData([], e.message);
      res.status(StatusCode.InternalServerError).json(results);

    }
  }
}