import DriverDAO from "../dao/DriverDAO";

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

  async updateDriver<T = any>(driverId: number, newData: T) {
    return await DriverDAO.updateDriver(driverId, newData);
  }

  async getDrivers<T = any>() {
    return await DriverDAO.getDrivers<T>();
  }

  async getDriverByID<T = any>(driverId: number) {
    return await DriverDAO.getDriverByID<T>(driverId);
  }

  async getDriverPlace<T = any>(place: number) {
    return await DriverDAO.getDriverByPlace<T>(place);
  }

  async getDriversByPlaceRanges<T = any>(range_a: number, range_b: number) {
    return await DriverDAO.getDriversByPlaceRanges<T>(range_a, range_b);
  }
}

export default new DriversService();
