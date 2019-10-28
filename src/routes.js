import { Router } from "express";

import SessionController from "./app/controllers/SessionController";
import StudentController from "./app/controllers/StudentController";
import PlanController from "./app/controllers/PlanController";
import RegistrationController from "./app/controllers/RegistrationController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/login", SessionController.store);

routes.use(authMiddleware);

routes.post("/student", StudentController.store);
routes.put("/student", StudentController.update);

routes.post("/plan", PlanController.store);
routes.get("/plan", PlanController.index);
routes.delete("/plan", PlanController.delete);
routes.put("/plan", PlanController.update);

routes.get("/registration", RegistrationController.index);
routes.post("/registration", RegistrationController.store);
routes.put("/registration", RegistrationController.update);
routes.delete("/registration", RegistrationController.delete);

export default routes;
