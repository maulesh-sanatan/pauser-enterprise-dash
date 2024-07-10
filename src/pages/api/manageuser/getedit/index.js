import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "GET") {
    const id = req.query.id;

    console.log(id, "for edit");
    const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    console.log(userRows);
    if (userRows.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Company not found" });
    }
    const User = userRows[0];

    res.status(201).json({
      status: true,
      data: User,
    });
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
