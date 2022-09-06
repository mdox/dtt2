import { Router } from "express";
import DriversController from "../controller/DriversController";

const driversRouter = Router();

driversRouter.get("/drivers", DriversController.getDrivers);
driversRouter.post("/drivers/:takerId/overtake", DriversController.overtake);
driversRouter.post(
  "/drivers/:takerId/takeplace/:holderId",
  DriversController.takePlace
);

export default driversRouter;
