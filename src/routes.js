import { Router } from "express";

import SessionController from "./app/controllers/SessionController";
import StudentController from "./app/controllers/StudentController";
import PlanController from "./app/controllers/PlanController";
import RegistrationController from "./app/controllers/RegistrationController";
import HelpOrderController from "./app/controllers/HelpOrderController";
import HelpOrderResponseController from "./app/controllers/HelpOrderResponseController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/login", SessionController.store);

routes.post("/students/:student_id/help-orders", HelpOrderController.store);
routes.get("/help-orders/:student_id/help-orders", HelpOrderController.index);

routes.use(authMiddleware);

routes.get("/help-orders/answer", HelpOrderResponseController.index);
routes.post("/help-orders/:id/answer", HelpOrderResponseController.store);

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
