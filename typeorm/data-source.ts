import * as dotenv from "dotenv";
import { DataSource } from "typeorm"

dotenv.config()

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST_DB,
  port: +process.env.PORT_DB,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB,
  migrations: [`${__dirname}/migrations/**/*.ts`]
});

export default AppDataSource