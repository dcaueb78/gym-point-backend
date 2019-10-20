import { Router } from "express";

// import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import StudentController from "./app/controllers/StudentController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// routes.post("/", UserController.Store);
routes.post("/login", SessionController.Store);

routes.use(authMiddleware);

routes.post("/student", StudentController.Store);
routes.put("/student", StudentController.Update);

export default routes;
