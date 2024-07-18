import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "GET") {
    const { companyId, userId, fromDate, toDate } = req.query;
    console.log(companyId, userId, fromDate, toDate);
  
    const id = parseInt(companyId);
    console.log(id);
    const [userRows] = await db.query(
      `SELECT id, name, email FROM ${companyId}_users WHERE id = ?`,
      [userId]
    );
  
    const tables = [
      `${companyId}_user_app_access_log`,
      `${companyId}_heart_rate_session`,
      `${companyId}_breath_data`,
      `${companyId}_meditation_data`,
      `${companyId}_monitor_session_data`,
    ];
  
    const tableExistencePromises = tables.map((tableName) =>
      db.query(`SHOW TABLES LIKE '${tableName}'`)
    );
  
    const tableExistenceResults = await Promise.all(tableExistencePromises);
  
    const tableExistence = tableExistenceResults.map(
      ([result]) => result.length > 0
    );
  
    let totalLogins = 0;
    let totalHrs = 0;
    let totalBreaths = 0;
    let totalMeditations = 0;
    let totalMonitorSessions = 0;
  
    const dateCondition =
      fromDate && toDate
        ? `AND created_at BETWEEN '${fromDate}' AND '${toDate}'`
        : "";
  
    if (tableExistence[0]) {
      const [loginRows] = await db.query(
        `SELECT COUNT(*) AS totalLogins FROM ${tables[0]} WHERE user_id = ? ${dateCondition}`,
        [userId]
      );
      totalLogins = loginRows[0]?.totalLogins || 0;
    }
  
    if (tableExistence[1]) {
      const [hrRows] = await db.query(
        `SELECT COUNT(*) AS totalHrs FROM ${tables[1]} WHERE user_id = ? ${dateCondition}`,
        [userId]
      );
      totalHrs = hrRows[0]?.totalHrs || 0;
    }
  
    if (tableExistence[2]) {
      const [breathRows] = await db.query(
        `SELECT COUNT(*) AS totalBreaths FROM ${tables[2]} WHERE user_id = ? ${dateCondition}`,
        [userId]
      );
      totalBreaths = breathRows[0]?.totalBreaths || 0;
    }
  
    if (tableExistence[3]) {
      const [meditationRows] = await db.query(
        `SELECT COUNT(*) AS totalMeditations FROM ${tables[3]} WHERE user_id = ? ${dateCondition}`,
        [userId]
      );
      totalMeditations = meditationRows[0]?.totalMeditations || 0;
    }
  
    if (tableExistence[4]) {
      const [monitorSessionRows] = await db.query(
        `SELECT COUNT(*) AS totalMonitorSessions FROM ${tables[4]} WHERE user_id = ? ${dateCondition}`,
        [userId]
      );
      totalMonitorSessions = monitorSessionRows[0]?.totalMonitorSessions || 0;
    }
  
    const fetchDataPromises = tables.map((tableName, index) => {
      if (tableExistence[index]) {
        return db.query(
          `SELECT * FROM ${tableName} WHERE user_id = ? ${dateCondition}`,
          [userId]
        );
      }
      return [];
    });
  
    const fetchDataResults = await Promise.all(fetchDataPromises);
  
    const [
      userAppAccessLogResult,
      heartRateSessionResult,
      breathDataResult,
      meditationDataResult,
      monitorSessionDataResult,
    ] = fetchDataResults.map(([rows]) => rows || []);
  
    res.status(200).json({
      status: true,
      totalLogins,
      totalHrs,
      totalBreaths,
      totalMeditations,
      totalMonitorSessions,
      user: {
        id: userId,
        name: userRows[0]?.name || "", 
        email: userRows[0]?.email || "",
      },
      data: {
        userAppAccessLog: userAppAccessLogResult,
        heartRateSession: heartRateSessionResult,
        breathData: breathDataResult,
        meditationData: meditationDataResult,
        monitorSessionData: monitorSessionDataResult,
      },
    });
  }
   else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
