import type { Knex } from "knex";

const config: Knex.Config = {
  client: "postgres",
  connection: {
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "postgres",
  },
};

export default config;
