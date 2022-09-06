import supertest from "supertest";
import { DriverClientPost } from "../lib/types";
import createServer from "../server";
import DriversService from "../service/DriversService";

const app = createServer();

describe("drivers", () => {
  describe("GET /drivers", () => {
    it("should return 200, and JSON array with items", async () => {
      const { statusCode, body } = await supertest(app).get("/drivers");

      expect(statusCode).toBe(200);
      expect(body.length).toBeDefined();
      expect(body.length).toBeGreaterThan(0);
    });
  });

  describe("POST /drivers/:driverId/overtake", () => {
    it("once should return 200 without any changes", async () => {
      const driversBefore = await DriversService.getDrivers();

      expect(driversBefore).toBeDefined();

      if (!driversBefore) return;

      const driverId = driversBefore.find((driver) => driver.place === 0)?.id;

      const { statusCode, body: driversAfterAny } = await supertest(app).post(
        `/drivers/${driverId}/overtake`
      );

      expect(statusCode).toBe(200);

      const driversAfter: DriverClientPost[] = driversAfterAny;

      expect(driversAfter.length).toEqual(driversBefore.length);
      expect(
        driversAfter.find(
          (nextDriver, index) =>
            driversBefore[index].place !== nextDriver.place ||
            driversBefore[index].id !== nextDriver.id
        )
      ).toBeUndefined();
    });

    it("then should return 201 with change (driver on place 3 overtakes)", async () => {
      const driversBefore = await DriversService.getDrivers();

      expect(driversBefore).toBeDefined();

      if (!driversBefore) return;

      const driverId = driversBefore.find(
        (driver) => driver.place === 3 - 1
      )?.id;

      expect(driverId).toBeDefined;

      if (!driverId) return;

      const { statusCode, body: driversAfterAny } = await supertest(app).post(
        `/drivers/${driverId}/overtake`
      );
      const driversAfter: DriverClientPost[] = driversAfterAny;

      expect(statusCode).toBe(201);
      expect(driversAfter.length).toEqual(driversBefore.length);

      const driverAfter = driversAfter.find((driver) => driver.id === driverId);

      expect(driverAfter).toBeDefined();

      if (!driverAfter) return;

      expect(driverAfter.place).toBe(1);
    });

    it("should return 400 for '/drivers/asd/overtake'", (done) => {
      supertest(app).post(`/drivers/asd/overtake`).expect(400, done);
    });

    it("should return 404 for '/drivers/99999/overtake'", (done) => {
      supertest(app).post(`/drivers/99999/overtake`).expect(404, done);
    });
  });

  describe("POST /drivers/:takerId/takeplace/:holderId", () => {
    it("should change and return 201 for '/drivers/<AT_PLACE_2>/takeplace/<AT_PLACE_5>'", async () => {
      const takerBefore = (await DriversService.getDriverPlace(2 - 1))!;
      const holderBefore = (await DriversService.getDriverPlace(5 - 1))!;

      const results = await supertest(app).post(
        `/drivers/${takerBefore.id}/takeplace/${holderBefore.id}`
      );

      expect(results.statusCode).toBe(201);

      await new Promise((res) => setTimeout(res, 1000));

      const takerAfter = (await DriversService.getDriverByID(takerBefore.id))!;
      const holderAfter = (await DriversService.getDriverByID(
        holderBefore.id
      ))!;

      expect(takerAfter.place).toBe(holderBefore.place);
      expect(holderAfter.place).toBe(holderBefore.place - 1);
    });

    it("should return 400 for '/drivers/aaa/takeplace/bbb'", (done) => {
      supertest(app).post(`/drivers/aaa/takeplace/bbb`).expect(400, done);
    });

    it("should return 400 for '/drivers/2/takeplace/bbb'", (done) => {
      supertest(app).post(`/drivers/2/takeplace/bbb`).expect(400, done);
    });

    it("should return 400 for '/drivers/aaa/takeplace/2'", (done) => {
      supertest(app).post(`/drivers/aaa/takeplace/2`).expect(400, done);
    });

    it("should return 404 for '/drivers/9999/takeplace/2'", (done) => {
      supertest(app).post(`/drivers/9999/takeplace/2`).expect(404, done);
    });

    it("should return 404 for '/drivers/2/takeplace/9999'", (done) => {
      supertest(app).post(`/drivers/2/takeplace/9999`).expect(404, done);
    });
  });
});
