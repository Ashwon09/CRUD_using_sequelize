import { Pool } from "pg";
import { Sequelize } from "sequelize";
import Config from "./Config/Config";
const pool = new Pool({
  user: Config.database.user,
  host: Config.database.host,
  database: Config.database.database,
  password: Config.database.password,
  port: Number(Config.database.port),
});

export const sequelize = new Sequelize("typescriptdatabase", "postgres", "qwerty", {
  host: "localhost",
  dialect: "postgres",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection successful");
  } catch (error) {
    console.error(error);
  }
}

testConnection();

pool.connect(function (err, b) {
  if (err) throw err;
  console.log("connected");
});
export default pool;
