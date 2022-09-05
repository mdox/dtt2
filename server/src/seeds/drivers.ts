import { Knex } from "knex";
import driversJSON from "../../../resources/drivers.json";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("drivers").del();

  const drivers: any[] = driversJSON;

  const places = Object.keys(drivers).sort(() => Math.random() - 0.5);

  drivers.forEach((driver) => {
    driver.place = Number(places.shift());
    driver.img_url = `/static/${driver.code!.toLowerCase()}.png`;
  });

  // Inserts seed entries
  await knex("drivers").insert(drivers);
}
