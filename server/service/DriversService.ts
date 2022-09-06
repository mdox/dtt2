import DriverDAO from "../dao/DriverDAO";
import { DriverServerPost } from "../lib/types";

class DriversService {
  async createDriver(data: {
    code: string;
    firstname: string;
    lastname: string;
    country: string;
    team: string;
    place: number;
    img_url: string;
  }) {
    return await DriverDAO.createDriver(data);
  }

  async updateDriver(driverId: number, newData: Partial<DriverServerPost>) {
    return await DriverDAO.updateDriver(driverId, newData);
  }

  async getDrivers() {
    return await DriverDAO.getDrivers();
  }

  async getDriverByID(driverId: number) {
    return await DriverDAO.getDriverByID(driverId);
  }

  async getDriverPlace(place: number) {
    return await DriverDAO.getDriverByPlace(place);
  }

  async getDriversByPlaceRanges(range_a: number, range_b: number) {
    return await DriverDAO.getDriversByPlaceRanges(range_a, range_b);
  }
}

export default new DriversService();
