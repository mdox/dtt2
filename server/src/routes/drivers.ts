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
  const driver = db.find((item) => item.id === driverId);

  if (!driver) return send(res, 404);

  const nextDriver = db.find((item) => item.place! === driver.place! - 1);

  if (nextDriver) {
    nextDriver.place = driver.place!;
    driver.place = driver.place! - 1;
    send(res, 201);
  } else {
    send(res, 200);
  }
});

driversRouter.post(
  "/drivers/:takerDriverId/takeplace/:holderDriverId",
  (req, res) => {
    const takerDriverId = parseInt(req.params.takerDriverId);
    const holderDriverId = parseInt(req.params.holderDriverId);

    if (isNaN(takerDriverId)) return send(res, 400);
    if (isNaN(holderDriverId)) return send(res, 400);

    const db = getDatabase();
    const takerDriver = db.find((item) => item.id === takerDriverId);
    const holderDriver = db.find((item) => item.id === holderDriverId);

    if (!takerDriver) return send(res, 404);
    if (!holderDriver) return send(res, 404);

    const goalPlace = holderDriver.place!;
    const dir = takerDriver.place! > goalPlace ? -1 : 1;
    const sort = db.slice().sort((a, b) => a.place! - b.place!);

    for (var i = takerDriver.place!; i != goalPlace; i += dir) {
      const nextDriver = sort[i + dir];
      if (!nextDriver) break;
      nextDriver.place = takerDriver.place!;
      takerDriver.place! += dir;
    }

    send(res, 201);
  }
);

//

export default driversRouter;
