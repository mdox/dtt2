import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("drivers", (table) => {
    table.increments("id");
    table.string("code");
    table.string("firstname");
    table.string("lastname");
    table.string("country");
    table.string("team");
    table.integer("place");
    table.string("img_url");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("drivers");
}
