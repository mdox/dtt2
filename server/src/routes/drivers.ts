import { Response, Router } from "express";
import { getDatabase } from "../db";

const driversRouter = Router();

//

function send(res: Response, code: number = 200) {
  res.status(code).json(getDatabase());
}

//

driversRouter.get("/drivers", (req, res) => {
  send(res);
});

driversRouter.post("/drivers/:driverId/overtake", (req, res) => {
  const driverId = parseInt(req.params.driverId);

  if (isNaN(driverId)) return send(res, 400);

  const db = getDatabase();
  const driver = db.find((other) => other.id === driverId);

  if (!driver) return send(res, 404);

  const otherDriver = db.find((other) => other.place === driver.place! - 1);

  if (!otherDriver) return send(res);

  otherDriver.place = driver.place;
  driver.place = driver.place! - 1;

  send(res, 201);
});

//

export default driversRouter;
