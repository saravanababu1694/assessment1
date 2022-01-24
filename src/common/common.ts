export class ReturnData {
    data: any;
    message: string;
    constructor(data: any, message: string) {
        this.data = data;
        this.message = message;
    }
}

/* ReturnStatus For Request and Response */
export enum ReturnStatus {
    SuccessServicesCall = 0,
    Error,
    Warning,
    Info,
    Invalid,
    Success
}

/* LoginType For Request and Response */
export enum ProgressType {
    InvalidProcess = 0,
    Success,
    InvalidUserData,
    NoDataFound
}

export enum StatusCode{
    "success" = 200,
    "badRequest" = 400,
    "unAuthorized" = 401,
    "noDataFound" = 404,
    "InternalServerError" = 500
}