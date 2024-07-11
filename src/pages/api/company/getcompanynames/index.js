import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "GET") {
    const [userRows] = await db.query("SELECT id, company_name FROM company");

    const userData = userRows;

    res.status(201).json({
      status: true,
      data: userData,
    });
  }
});
