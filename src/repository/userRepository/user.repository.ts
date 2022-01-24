import { ProgressType } from '../../common/common';
import { userModel } from '../../model/UserModel/user-model';
import * as moment from 'moment';
import { query } from './Query'
import { dbPool, appConfig } from '../../common/config';
import _ = require('lodash');
import * as jwt from 'jsonwebtoken';
import { Connection } from 'pg';


export class UserRepository {

    async createUser(model: userModel) {

        const createUserValues = [`'${model.user_id}'`, `'${model.username}'`, `'${model.password}'`];

        const createUserQuery = createUserValues.reduce((a, b, c) => `${a}`.replace(`{${c}}`, b), query.insertUserDetails);

        const createUserResult: any = await dbPool.query(createUserQuery);

        if (createUserResult.rowCount > 0) {

            return ProgressType.Success;
        } else {

            return ProgressType.InvalidProcess;

        }
    }

    async userAuth(model: userModel) {

        const checkUserValues = [`'${model.username}'`, `'${model.password}'`];

        const checkUserQuery = checkUserValues.reduce((a, b, c) => `${a}`.replace(`{${c}}`, b), query.customerDetails);

        const checkUserResult: any = await dbPool.query(checkUserQuery);

        if (checkUserResult.rowCount > 0) {

            //generate jwt token and update on user table
            const data = checkUserResult.rows[0].username;

            let token = await jwt.sign({ data }, appConfig.secretKey, { expiresIn: appConfig.expiresIn });

            //update the token value on user data
            const updateUserValues = [`'${token}'`, `'${checkUserResult.rows[0].user_id}'`];

            const updateUserQuery = updateUserValues.reduce((a, b, c) => `${a}`.replace(`{${c}}`, b), query.updateCustomerDetails);

            const updateUserResult: any = await dbPool.query(updateUserQuery);

            if (updateUserResult.rowCount > 0) {

                return updateUserResult.rows;
            }

        } else {
            //user data incorrect
            return ProgressType.InvalidUserData;
        }
    }

    async logOutUser(model: userModel) {

        const checkUserValues = [`'${model.username}'`, `'${model.password}'`];

        const checkUserQuery = checkUserValues.reduce((a, b, c) => `${a}`.replace(`{${c}}`, b), query.customerDetails);

        const checkUserResult: any = await dbPool.query(checkUserQuery);

        if (checkUserResult.rowCount > 0) {

            //update the token value on user data
            const updateUserValues = [`${null}`, `'${checkUserResult.rows[0].user_id}'`];

            const updateUserQuery = updateUserValues.reduce((a, b, c) => `${a}`.replace(`{${c}}`, b), query.updateCustomerDetails);

            const updateUserResult: any = await dbPool.query(updateUserQuery);

            if (updateUserResult.rowCount > 0) {

                return ProgressType.Success;
            }

        } else {

            return ProgressType.InvalidProcess;

        }
    }

    async getArticlesDetails() {

        const getArticlesResult: any = await dbPool.query(query.getArticles);

        if (getArticlesResult.rowCount > 0) {


            return getArticlesResult.rows;
        } else {

            return ProgressType.NoDataFound;
        }
    }

    async getParticularArticlesDetails(id: number) {

        const getParticularArticlesValue = [`${id}`];

        const getParticularArticlesValueQuery = getParticularArticlesValue.reduce((a, b, c) => `${a}`.replace(`{${c}}`, b), query.getParticularArticles);

        const getArticlesResult: any = await dbPool.query(getParticularArticlesValueQuery);
        
        if (getArticlesResult.rowCount > 0) {


            return getArticlesResult.rows;
        } else {

            return ProgressType.NoDataFound;
        }
    }

    // async updateCustomers(model: updateModel){

    //     const updateCustomerDetailsValues = [`'${model.customerName}'`,`'${model.customerEmail}'`,`'${model.customerPassword}'`,`'${model.customerMobileNumber}'`,`'${model.customerId}'`];

    //     const updateCustomerDetailsQuery = updateCustomerDetailsValues.reduce((a,b,c)=>`${a}`.replace(`{${c}}`,b), query.updateCustomerDetails);

    //     const updateCustomerDetailsQueryResult: any = await dbPool.query(updateCustomerDetailsQuery);

    //     if (updateCustomerDetailsQueryResult.rowCount > 0) {

    //             return updateCustomerDetailsQueryResult.rows;

    //     } else {

    //         return ProgressType.InvalidProcess;

    //     }
    // }

    // async deleteCustomers(model: deleteModel){

    //     const deleteCustomerDetailsValues = [`'${model.customerMobileNumber}'`,`'${model.customerId}'`];

    //     const deleteCustomerDetailsQuery = deleteCustomerDetailsValues.reduce((a,b,c)=>`${a}`.replace(`{${c}}`,b), query.deleteCustomer);

    //     const deleteCustomerDetailsQueryResult: any = await dbPool.query(deleteCustomerDetailsQuery);

    //     if (deleteCustomerDetailsQueryResult.rowCount > 0) {

    //             return deleteCustomerDetailsQueryResult.rows;

    //     } else {

    //         return ProgressType.InvalidProcess;

    //     }
    // }
}