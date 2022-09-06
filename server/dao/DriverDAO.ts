import db from "../db";

class DriverDAO {
  async createDriver(data: {
    code: string;
    firstname: string;
    lastname: string;
    country: string;
    team: string;
    place: number;
    img_url: string;
  }) {
    let success = true;

    try {
      await db("drivers").insert(data);
    } catch (e) {
      success = false;
    }

    return success;
  }

  async updateDriver<T = any>(driverId: number, newData: T) {
    let success = true;

    try {
      await db("drivers").update(newData).where({ id: driverId });
    } catch (e) {
      success = false;
    }

    return success;
  }

  async getDrivers<T = any>() {
    try {
      const results = await db("drivers").select("*");
      return results as T[];
    } catch (e) {}
  }

  async getDriverByID<T = any>(driverId: number) {
    try {
      const results = await db("drivers").where({ id: driverId });
      return results[0] as T;
    } catch (e) {}
  }

  async getDriverByPlace<T = any>(place: number) {
    try {
      const results = await db("drivers").where({ place });
      return results[0] as T;
    } catch (e) {}
  }

  async getDriversByPlaceRanges<T = any>(range_a: number, range_b: number) {
    try {
      const min = Math.min(range_a, range_b);
      const max = Math.max(range_a, range_b);
      const results = await db("drivers").whereBetween("place", [min, max]);
      return results as T[];
    } catch (e) {}
  }
}

export default new DriverDAO();
