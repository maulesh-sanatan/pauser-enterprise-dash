import recordDbPool from "@/database/dbConnection2";
import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "GET") {
    const { userId, fromDate, toDate } = req.query;

    // Validate userId
    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({
        status: false,
        message: "Invalid or missing userId",
      });
    }

    console.log(userId);

    try {
      // Fetch user details
      const [userRows] = await recordDbPool.query(
        `SELECT * FROM new_pauser.users WHERE id = ?`,
        [userId]
      );

      if (userRows.length === 0) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      // Define the tables to check and query
      const tables = ["heart_rate_sessions", "breath_data", "meditation_data"];

      // Check if tables exist
      const tableExistencePromises = tables.map((tableName) =>
        recordDbPool.query(`SHOW TABLES LIKE '${tableName}'`)
      );

      const tableExistenceResults = await Promise.all(tableExistencePromises);

      const tableExistence = tableExistenceResults.map(
        ([result]) => result.length > 0
      );

      let totalHrs = 0;
      let totalBreaths = 0;
      let totalMeditations = 0;

      const dateCondition =
        fromDate && toDate
          ? `AND created_at BETWEEN '${fromDate}' AND '${toDate}'`
          : "";

      // Fetch counts from each table
      if (tableExistence[0]) {
        const [hrRows] = await recordDbPool.query(
          `SELECT COUNT(*) AS totalHrs FROM ${tables[0]} WHERE user_id = ? ${dateCondition}`,
          [userId]
        );
        totalHrs = hrRows[0]?.totalHrs || 0;
      }

      if (tableExistence[1]) {
        const [breathRows] = await recordDbPool.query(
          `SELECT COUNT(*) AS totalBreaths FROM ${tables[1]} WHERE user_id = ? ${dateCondition}`,
          [userId]
        );
        totalBreaths = breathRows[0]?.totalBreaths || 0;
      }

      if (tableExistence[2]) {
        const [meditationRows] = await recordDbPool.query(
          `SELECT COUNT(*) AS totalMeditations FROM ${tables[2]} WHERE user_id = ? ${dateCondition}`,
          [userId]
        );
        totalMeditations = meditationRows[0]?.totalMeditations || 0;
      }

      // Fetch data from each table
      const fetchDataPromises = tables.map((tableName, index) => {
        if (tableExistence[index]) {
          return recordDbPool.query(
            `SELECT * FROM ${tableName} WHERE user_id = ? ${dateCondition}`,
            [userId]
          );
        }
        return [];
      });

      const fetchDataResults = await Promise.all(fetchDataPromises);

      const [heartRateSessionResult, breathDataResult, meditationDataResult] =
        fetchDataResults.map(([rows]) => rows || []);

      // Send response
      res.status(200).json({
        status: true,
        totalHrs,
        totalBreaths,
        totalMeditations,
        user: {
          id: userId,
          name: userRows[0]?.name || "",
          email: userRows[0]?.email || "",
        },
        data: {
          heartRateSession: heartRateSessionResult,
          breathData: breathDataResult,
          meditationData: meditationDataResult,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
