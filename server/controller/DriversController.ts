import { Request, Response } from "express";
import DriversService from "../service/DriversService";

async function sendDrivers(res: Response, code: number = 200) {
  const drivers = await DriversService.getDrivers();

  if (!drivers) {
    res.status(500).send(null);
    return;
  }

  drivers.forEach((driver) => {
    driver.imgUrl = driver.img_url;
    delete driver.img_url;
  });

  res.status(code).json(drivers);
}

class DriversController {
  async getDrivers(req: Request, res: Response) {
    await sendDrivers(res, 200);
  }

  async overtake(req: Request, res: Response) {
    const takerIdUnsafe = req.params.takerId;
    const takerId = parseInt(takerIdUnsafe);

    if (isNaN(takerId)) {
      await sendDrivers(res, 400);
      return;
    }

    const taker = await DriversService.getDriverByID(takerId);

    if (!taker) {
      await sendDrivers(res, 404);
      return;
    }

    const nextDriver = await DriversService.getDriverPlace(taker.place - 1);

    if (!nextDriver) {
      await sendDrivers(res, 200);
      return;
    }

    await Promise.all([
      DriversService.updateDriver(takerId, { place: taker.place - 1 }),
      DriversService.updateDriver(nextDriver.id, { place: taker.place }),
    ]);

    await sendDrivers(res, 201);
  }

  async takePlace(req: Request, res: Response) {
    const takerIdUnsafe = req.params.takerId;
    const holderIdUnsafe = req.params.holderId;

    const takerId = parseInt(takerIdUnsafe);
    const holderId = parseInt(holderIdUnsafe);

    if (isNaN(takerId) || isNaN(holderId)) {
      await sendDrivers(res, 400);
      return;
    }

    const [takerDriver, holderDriver] = await Promise.all([
      DriversService.getDriverByID(takerId),
      DriversService.getDriverByID(holderId),
    ]);

    if (!takerDriver || !holderDriver) {
      await sendDrivers(res, 404);
      return;
    }

    const drivers = await DriversService.getDriversByPlaceRanges(
      takerDriver.place,
      holderDriver.place
    );

    if (!drivers) {
      await sendDrivers(res, 404);
      return;
    }

    const dir = takerDriver.place > holderDriver.place ? -1 : 1;

    drivers.forEach((driver) => {
      if (driver.id !== takerDriver.id) {
        driver.place -= dir;
      } else {
        driver.place = holderDriver.place;
      }
    });

    await Promise.all(
      drivers.map((driver) =>
        DriversService.updateDriver(driver.id, { place: driver.place })
      )
    );

    await sendDrivers(res, 201);
  }
}

export default new DriversController();
