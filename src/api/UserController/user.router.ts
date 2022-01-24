import { Router } from "express";
import { UserController } from "./user.controller";
import { AuthRoutes } from "../../services/jwt.auth";


class UserRoutes {
    
    private controllerProcess: UserController = new UserController();
    private authroutes: AuthRoutes = new AuthRoutes();
    router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.post("/api/user", this.controllerProcess.createUser);
        this.router.post("/api/authentication",  this.controllerProcess.userAuthentication);
        this.router.post("/api/logout", this.authroutes.isAuthenticated, this.controllerProcess.logOutUser);
        this.router.get("/api/articles", this.authroutes.isAuthenticated,this.controllerProcess.getArticles);
        this.router.get("/api/articles/:id", this.authroutes.isAuthenticated,this.controllerProcess.getParticularArticles);
    }
}

const userRoutes = new UserRoutes();
userRoutes.init();

export default userRoutes.router;


