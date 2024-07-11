import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "GET") {
    const { companyId } = req.query;
    console.log(companyId);
    const id = parseInt(companyId);
    console.log(id);

    const tableName = `${companyId}_app_usage`;
    const hrTableName = `${companyId}_hr_dump`;
    console.log(tableName, hrTableName);

    const [loginTableExists] = await db.query(
      `SHOW TABLES LIKE '${tableName}'`
    );

    const [hrTableExists] = await db.query(`SHOW TABLES LIKE '${hrTableName}'`);

    let totalLogins = 0;
    let totalHrs = 0;

    if (loginTableExists.length) {
      const [loginRows] = await db.query(
        `SELECT COUNT(*) AS totalLogins FROM ${tableName}`
      );
      totalLogins = loginRows[0]?.totalLogins || 0;
    }

    if (hrTableExists.length) {
      const [hrRows] = await db.query(
        `SELECT COUNT(*) AS totalHrs FROM ${hrTableName}`
      );
      totalHrs = hrRows[0]?.totalHrs || 0;
    }

    res.status(200).json({ status: true, totalLogins, totalHrs });
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
