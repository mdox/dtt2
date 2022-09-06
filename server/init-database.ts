import knex, { Knex } from "knex";
import configs from "./knexfile";

const env = process.env.NODE_ENV as string;
const config = configs[env];

if (!config) throw "Config is not found.";
if (!config.connection) throw "No 'connection' defined.";

const connection = config.connection as Knex.PgConnectionConfig;

if (!connection.database) throw "No 'database' defined.";

const { database, ...connectionConfigWithoutDatabase } = connection;

const main = async () => {
  let db = knex({
    client: "pg",
    connection: {
      ...connectionConfigWithoutDatabase,
    },
  });

  try {
    await db.raw("CREATE DATABASE ??", database);
  } catch (e) {
    if ((e as any).code !== "42P04") {
      throw e;
    }
  }

  db = knex(config);

  await db.migrate.latest();
  await db.seed.run();
};

main()
  .catch(console.log)
  .then(() => process.exit());
