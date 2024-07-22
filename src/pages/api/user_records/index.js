
import recordDbPool from "@/database/dbConnection2";
import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "GET") {
    const { companyId, fromDate, toDate } = req.query;
    console.log(companyId, fromDate, toDate);
    console.log("abc");
    const id = parseInt(companyId);
    console.log(id);

    const tables = [
      `${companyId}_user_app_access_log`,
      `${companyId}_heart_rate_session`,
      `${companyId}_breath_data`,
      `${companyId}_meditation_data`,
      `${companyId}_users`,
      `${companyId}_monitor_session_data`,
    ];

    const tableExistencePromises = tables.map((tableName) =>
      recordDbPool.query(`SHOW TABLES LIKE '${tableName}'`)
    );

    const tableExistenceResults = await Promise.all(tableExistencePromises);

    const tableExistence = tableExistenceResults.map(
      ([result]) => result.length > 0
    );

    let totalLogins = 0;
    let totalHrs = 0;
    let totalBreaths = 0;
    let totalMeditations = 0;
    let totalUsers = 0;
    let totalMonitorSessions = 0;

    const dateCondition =
      fromDate && toDate
        ? `WHERE created_at BETWEEN '${fromDate}' AND '${toDate}'`
        : "";

    if (tableExistence[0]) {
      const [loginRows] = await recordDbPool.query(
        `SELECT COUNT(*) AS totalLogins FROM ${tables[0]} ${dateCondition}`
      );
      totalLogins = loginRows[0]?.totalLogins || 0;
    }

    if (tableExistence[1]) {
      const [hrRows] = await recordDbPool.query(
        `SELECT COUNT(*) AS totalHrs FROM ${tables[1]} ${dateCondition}`
      );
      totalHrs = hrRows[0]?.totalHrs || 0;
    }

    if (tableExistence[2]) {
      const [breathRows] = await recordDbPool.query(
        `SELECT COUNT(*) AS totalBreaths FROM ${tables[2]} ${dateCondition}`
      );
      totalBreaths = breathRows[0]?.totalBreaths || 0;
    }

    if (tableExistence[3]) {
      const [meditationRows] = await recordDbPool.query(
        `SELECT COUNT(*) AS totalMeditations FROM ${tables[3]} ${dateCondition}`
      );
      totalMeditations = meditationRows[0]?.totalMeditations || 0;
    }

    if (tableExistence[4]) {
      const [userRows] = await recordDbPool.query(
        `SELECT COUNT(*) AS totalUsers FROM ${tables[4]} ${dateCondition}`
      );
      totalUsers = userRows[0]?.totalUsers || 0;
    }

    if (tableExistence[5]) {
      const [monitorSessionRows] = await recordDbPool.query(
        `SELECT COUNT(*) AS totalMonitorSessions FROM ${tables[5]} ${dateCondition}`
      );
      totalMonitorSessions = monitorSessionRows[0]?.totalMonitorSessions || 0;
    }

    const fetchDataPromises = tables.map((tableName, index) => {
      if (tableExistence[index]) {
        return recordDbPool.query(`SELECT * FROM ${tableName} ${dateCondition}`);
      }
      return [];
    });

    const fetchDataResults = await Promise.all(fetchDataPromises);

    const [
      userAppAccessLogResult,
      heartRateSessionResult,
      breathDataResult,
      meditationDataResult,
      usersResult,
      monitorSessionDataResult,
    ] = fetchDataResults.map(([rows]) => rows || []);

    res.status(200).json({
      status: true,
      totalLogins,
      totalHrs,
      totalBreaths,
      totalMeditations,
      totalUsers,
      totalMonitorSessions,
      data: {
        userAppAccessLog: userAppAccessLogResult,
        heartRateSession: heartRateSessionResult,
        breathData: breathDataResult,
        meditationData: meditationDataResult,
        users: usersResult,
        monitorSessionData: monitorSessionDataResult,
      },
    });
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
