import {
  createAppAccessLogTable,
  createAppUsageTable,
  createBreathDataTable,
  createHRDumpTable,
  createHeartRateSessionsTable,
  createMeditationDataTable,
  createMonitorTable,
  createUserTable,
} from "@/database/migrations";
import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res, file) {
  if (req.method === "GET") {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const search = req.query.search || "";

    const offset = (page - 1) * pageSize;
    console.log(search, "serch");

    let sqlQuery = "SELECT * FROM company WHERE deleted_at IS NULL";
    let sqlParams = [];
    if (search.trim() !== "") {
      sqlQuery +=
        " WHERE company_name LIKE ? OR username LIKE ? OR email LIKE ? ";
      sqlParams = Array(3).fill(`%${search}%`);
    }

    const [[{ totalCount }]] = await db.query(
      `SELECT COUNT(*) as totalCount FROM (${sqlQuery}) as countTable`,
      sqlParams
    );

    const [rows] = await db.query(`${sqlQuery} LIMIT ? OFFSET ?`, [
      ...sqlParams,
      pageSize,
      offset,
    ]);

    const filteredRows = rows.filter((row) => row.user_group !== "super admin");

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      status: true,
      data: filteredRows,
      pagination: {
        totalDocs: totalCount,
        totalPages: totalPages,
        currentPage: page,
        limit: pageSize,
      },
    });
  } else if (req.method === "POST") {
    const { name, email, password, username, domain, company_identity } =
      req.body;
    console.log(req.body, "req.body");

    try {
      const query = `
        SELECT email, username, company_identity 
        FROM pauser_enterprise.company 
        WHERE email = ? OR username = ? OR company_identity = ?
      `;
      const [existingUser] = await db.query(query, [
        email,
        username,
        company_identity,
      ]);

      if (existingUser.length > 0) {
        let errorMessage = "already exist following field:";
        if (existingUser.some((user) => user.email === email)) {
          errorMessage += " Email";
        }
        if (existingUser.some((user) => user.username === username)) {
          errorMessage += " Username";
        }
        if (
          existingUser.some(
            (user) => user.company_identity === company_identity
          )
        ) {
          errorMessage += " Company Identity";
        }
        return res.status(409).json({ status: false, message: errorMessage });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const secretkey = process.env.JWT_KEY;
      const token = jwt.sign({ email, username }, secretkey);

      const [result] = await db.query(
        `INSERT INTO company (
          company_name, email, password, username, domain_name, company_identity, role
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          email,
          hashedPassword,
          username,
          domain,
          company_identity,
          "admin",
        ]
      );

      const [insertedData] = await db.query(
        "SELECT * FROM company WHERE id = ?",
        [result.insertId]
      );
      const companyId = result.insertId;

      const appAccess = `${companyId}_user_app_access_log`;
      const heartRateSession = `${companyId}_heart_rate_session`;
      const breathData = `${companyId}_breath_data`;
      const meditationData = `${companyId}_meditation_data`;
      const UserTable = `${companyId}_users`;
      const monitorSessionData = `${companyId}_monitor_session_data`;
      const hrDumpData = `${companyId}_hr_dump`;
      const appUsageData = `${companyId}_app_usage`;

      await createUserTable(UserTable);
      await createAppAccessLogTable(appAccess);
      await createHeartRateSessionsTable(heartRateSession);
      await createBreathDataTable(breathData);
      await createMeditationDataTable(meditationData);
      await createMonitorTable(monitorSessionData);
      await createHRDumpTable(hrDumpData);
      await createAppUsageTable(appUsageData);

      res.status(200).json({ status: true, user: insertedData, token });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    const Id = req.query.id;
    console.log(Id);

    const { name, email, username } = req.body;
    console.log(req.body);

    const query = `
      SELECT email, username 
      FROM company 
      WHERE (email = ? OR username = ?) AND id != ?
    `;
    const [existingUser] = await db.query(query, [email, username, Id]);

    if (existingUser.length > 0) {
      let errorMessage = "already exist following field:";
      if (existingUser.some((user) => user.email === email)) {
        errorMessage += " Email";
      }
      if (existingUser.some((user) => user.username === username)) {
        errorMessage += "Username";
      }
      return res.status(409).json({ status: false, message: errorMessage });
    }

    const updateQuery = `
      UPDATE company SET
        company_name = ?, email = ?, username = ?
      WHERE id = ?
    `;

    const [result] = await db.query(updateQuery, [name, email, username, Id]);

    const [updatedData] = await db.query("SELECT * FROM company WHERE id = ?", [
      Id,
    ]);

    res.status(200).json({ status: true, user: updatedData });
  } else if (req.method === "DELETE") {
    const id = req.query.id;

    const [deleteResult] = await db.query(
      `UPDATE company SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ status: false, message: "user not found" });
    }

    return res.status(200).json({
      status: true,
      message: "user soft deleted successfully",
    });
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
