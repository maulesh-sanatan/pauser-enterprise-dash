import mysql from "mysql2/promise";
import config from "./config2";

const recordDbPool = mysql.createPool(config);

export default recordDbPool;
