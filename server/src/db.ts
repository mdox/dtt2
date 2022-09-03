import dbJSON from "../../resources/drivers.json";
import { Driver } from "./lib/types";

let db: Driver[] | undefined = undefined;

export function getDatabase() {
  if (db === undefined) {
    db = dbJSON;

    const places = Object.keys(db).sort(() => Math.random() - 0.5);

    db.forEach((driver) => {
      driver.place = Number(places.shift());
    });
  }

  return db;
}
