import { Router } from "express";
import { getDatabase } from "../db";

const driversRouter = Router();

//

driversRouter.get("/drivers", (req, res) => {
  res.json(getDatabase());
});

//

export default driversRouter;
