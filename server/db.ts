import knex from "knex";
import configs from "./knexfile";

const env = process.env.NODE_ENV as string;
const config = configs[env];

if (!config) throw "Config is not found for env: " + env;

const db = knex(config);

export default db;
