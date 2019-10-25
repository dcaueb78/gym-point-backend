import { Router } from "express";

// import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import StudentController from "./app/controllers/StudentController";
import PlanController from "./app/controllers/PlanController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// routes.post("/", UserController.Store);
routes.post("/login", SessionController.store);

routes.use(authMiddleware);

routes.post("/student", StudentController.store);
routes.put("/student", StudentController.update);

routes.post("/plan", PlanController.store);
routes.get("/plan", PlanController.index);
routes.delete("/plan", PlanController.delete);

export default routes;
