export class userModel {

    user_id: string;
    username: string;
    password: string;
    token: string;
    constructor(username?: string, password?: string, user_id?: string, token?: string) {
        this.user_id = user_id;
        this.token = token;
        this.username = username;
        this.password = password
    }

}
