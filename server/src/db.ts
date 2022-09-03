import dbJSON from "../../resources/drivers.json";
import { Driver } from "./lib/types";

let db: Driver[] | undefined = undefined;

export function getDatabase() {
  if (db === undefined) {
    db = dbJSON;
  }

  return db;
}
