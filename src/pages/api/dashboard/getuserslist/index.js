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
    const meditationTable = `${companyId}_meditation_data`;
    const breathTable = `${companyId}_breath_data`;
    const heartRateTable = `${companyId}_heart_rate_session`;

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    try {
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

      const userIds = userRows.map((user) => user.id);
      const placeholders = userIds.map(() => "?").join(",");

      const [meditationCounts] = await db.query(
        `SELECT user_id, COUNT(*) AS meditationCount FROM ${meditationTable} WHERE user_id IN (${placeholders}) GROUP BY user_id`,
        userIds
      );
      const [breathCounts] = await db.query(
        `SELECT user_id, COUNT(*) AS breathCount FROM ${breathTable} WHERE user_id IN (${placeholders}) GROUP BY user_id`,
        userIds
      );
      const [heartRateCounts] = await db.query(
        `SELECT user_id, COUNT(*) AS heartRateCount FROM ${heartRateTable} WHERE user_id IN (${placeholders}) GROUP BY user_id`,
        userIds
      );

      const usersWithCounts = userRows.map((user) => {
        const meditationCount =
          meditationCounts.find((count) => count.user_id === user.id)
            ?.meditationCount || 0;
        const breathCount =
          breathCounts.find((count) => count.user_id === user.id)
            ?.breathCount || 0;
        const heartRateCount =
          heartRateCounts.find((count) => count.user_id === user.id)
            ?.heartRateCount || 0;

        return {
          ...user,
          counts: {
            meditation: meditationCount,
            breath: breathCount,
            heartRate: heartRateCount,
          },
        };
      });

      const pagination = {
        totalDocs: totalCount,
        totalPages,
        currentPage: parseInt(page, 10),
        limit: parseInt(limit, 10),
      };

      res.status(200).json({
        status: true,
        data: usersWithCounts,
        pagination,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
