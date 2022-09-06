import db from "../db";
import { DriverServerPost, DriverServerPostToCreate } from "../lib/types";

class DriverDAO {
  async createDriver(data: DriverServerPostToCreate) {
    let success = true;

    try {
      await db("drivers").insert(data);
    } catch (e) {
      success = false;
    }

    return success;
  }

  async updateDriver(
    driverId: number,
    newData: Partial<DriverServerPostToCreate>
  ) {
    let success = true;

    try {
      await db("drivers").update(newData).where({ id: driverId });
    } catch (e) {
      success = false;
    }

    return success;
  }

  async getDrivers() {
    try {
      const results = await db("drivers");
      return results as DriverServerPost[];
    } catch (e) {}
  }

  async getDriverByID(driverId: number) {
    try {
      const results = await db("drivers").where({ id: driverId });
      return results[0] as DriverServerPost;
    } catch (e) {}
  }

  async getDriverByPlace(place: number) {
    try {
      const results = await db("drivers").where({ place });
      return results[0] as DriverServerPost;
    } catch (e) {}
  }

  async getDriversByPlaceRanges(range_a: number, range_b: number) {
    try {
      const min = Math.min(range_a, range_b);
      const max = Math.max(range_a, range_b);
      const results = await db("drivers").whereBetween("place", [min, max]);
      return results as DriverServerPost[];
    } catch (e) {}
  }
}

export default new DriverDAO();
