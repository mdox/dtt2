import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  test: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "test",
      user: "postgres",
      password: "postgres",
    },
  },
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "development",
      user: "postgres",
      password: "postgres",
    },
  },
  production: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "production",
      user: "postgres",
      password: "postgres",
    },
  },
};

export default config;
