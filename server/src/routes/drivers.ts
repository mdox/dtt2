import { Response, Router } from "express";
import db from "../db";
import { Driver } from "../lib/types";

const driversRouter = Router();

//

function castDriver(driver: any) {
  if (!driver) return driver as Driver;
  if (driver.img_url) {
    const result: any = Object.assign({ imgUrl: driver.img_url }, driver);
    delete result.img_url;
    return result as Driver;
  }
  return driver as Driver;
}

async function fetchDrivers() {
  const drivers = await db.select("*").table("drivers");

  drivers.forEach((driver) => {
    driver.imgUrl = driver.img_url;
    delete driver.img_url;
  });

  return drivers;
}

async function send(res: Response, code: number = 200) {
  await res.status(code).json(await fetchDrivers());
}

//

driversRouter.get("/drivers", async (req, res) => {
  send(res);
});

driversRouter.post("/drivers/:driverId/overtake", async (req, res) => {
  const driverId = parseInt(req.params.driverId);

  if (isNaN(driverId)) return await send(res, 400);

  const driver = castDriver(
    (await db.select("*").table("drivers").where({ id: driverId }))[0]
  );

  if (!driver) return await send(res, 404);

  const nextDriver = castDriver(
    (
      await db
        .select("*")
        .table("drivers")
        .where({ place: driver.place! - 1 })
    )[0]
  );

  if (nextDriver) {
    nextDriver.place! = driver.place!--;

    await db
      .update({ place: nextDriver.place! })
      .table("drivers")
      .where({ id: nextDriver.id });

    await db
      .update({ place: driver.place! })
      .table("drivers")
      .where({ id: driver.id });

    await send(res, 201);
  } else {
    await send(res, 200);
  }
});

driversRouter.post(
  "/drivers/:takerDriverId/takeplace/:holderDriverId",
  async (req, res) => {
    const takerDriverId = parseInt(req.params.takerDriverId);
    const holderDriverId = parseInt(req.params.holderDriverId);

    if (isNaN(takerDriverId)) return send(res, 400);
    if (isNaN(holderDriverId)) return send(res, 400);
    if (holderDriverId === takerDriverId) return send(res, 400);

    const takerDriver = castDriver(
      (await db("drivers").where({ id: takerDriverId }))[0]
    );

    const holderDriver = castDriver(
      (await db("drivers").where({ id: holderDriverId }))[0]
    );

    if (!takerDriver) return send(res, 404);
    if (!holderDriver) return send(res, 404);

    const min = Math.min(takerDriver.place!, holderDriver.place!);
    const max = Math.max(takerDriver.place!, holderDriver.place!);
    const items = await db("drivers").whereBetween("place", [min, max]);

    const dir = takerDriver.place! > holderDriver.place! ? -1 : 1;

    items.forEach((driver) => {
      if (driver.id !== takerDriver.id) {
        driver.place! -= dir;
      } else {
        driver.place! = holderDriver.place!;
      }
    });

    for (const driver of items) {
      await db("drivers")
        .update({ place: driver.place! })
        .where({ id: driver.id });
    }

    send(res, 201);
  }
);

//

export default driversRouter;
