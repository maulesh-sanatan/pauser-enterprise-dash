import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "GET") {
    const { companyId, page = 1, limit = 3, search = "" } = req.query;

    if (!companyId) {
      return res
        .status(400)
        .json({ status: false, message: "companyId is required" });
    }

    const userTable = `${companyId}_users`;

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [tableExistenceResult] = await db.query(`SHOW TABLES LIKE ?`, [
      userTable,
    ]);

    if (tableExistenceResult.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "User table not found" });
    }

    const searchQuery = `
      SELECT * FROM ${userTable}
      WHERE name LIKE ? OR email LIKE ? OR contact_no LIKE ?
      LIMIT ? OFFSET ?
    `;
    const searchParam = `%${search}%`;
    const [userRows] = await db.query(searchQuery, [
      searchParam,
      searchParam,
      searchParam,
      parseInt(limit, 10),
      offset,
    ]);

    const countQuery = `
      SELECT COUNT(*) AS totalCount FROM ${userTable}
      WHERE name LIKE ? OR email LIKE ? OR contact_no LIKE ?
    `;
    const [totalUsersCountResult] = await db.query(countQuery, [
      searchParam,
      searchParam,
      searchParam,
    ]);
    const totalCount = totalUsersCountResult[0]?.totalCount || 0;

    const totalPages = Math.ceil(totalCount / parseInt(limit, 10));

    const pagination = {
      totalDocs: totalCount,
      totalPages,
      currentPage: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    res.status(200).json({
      status: true,
      data: userRows,
      pagination,
    });
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
