import { Router } from "express";

import SessionController from "./app/controllers/SessionController";
import StudentController from "./app/controllers/StudentController";
import PlanController from "./app/controllers/PlanController";
import RegistrationController from "./app/controllers/RegistrationController";
import HelpOrderController from "./app/controllers/HelpOrderController";
import HelpOrderResponseController from "./app/controllers/HelpOrderResponseController";
import CheckingController from "./app/controllers/CheckinController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/login", SessionController.store);

routes.post("/students/:student_id/checkins", CheckingController.store);
routes.get("/students/:student_id/checkins", CheckingController.index);

routes.post("/students/:student_id/help-orders", HelpOrderController.store);
routes.get("/help-orders/:student_id/help-orders", HelpOrderController.index);

routes.get(
  "/help-orders/answer",
  authMiddleware,
  HelpOrderResponseController.index
);
routes.post(
  "/help-orders/:id/answer",
  authMiddleware,
  HelpOrderResponseController.store
);

routes.post("/student", authMiddleware, StudentController.store);
routes.put("/student", authMiddleware, StudentController.update);

routes.post("/plan", authMiddleware, PlanController.store);
routes.get("/plan", authMiddleware, PlanController.index);
routes.delete("/plan", authMiddleware, PlanController.delete);
routes.put("/plan", authMiddleware, PlanController.update);

routes.get("/registration", authMiddleware, RegistrationController.index);
routes.post("/registration", authMiddleware, RegistrationController.store);
routes.put("/registration", authMiddleware, RegistrationController.update);
routes.delete("/registration", authMiddleware, RegistrationController.delete);

export default routes;
