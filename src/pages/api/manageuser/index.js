import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import bcrypt from "bcrypt";
import db from "../../../database/dbConnection";
import { createUserTable } from "@/database/migrations";

export default asyncErrorHandler(async function handler(req, res, file) {
  if (req.method === "GET") {
    const { domain, role, page = 1, search = "" } = req.query;

    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const domainKeyword = domain.split(".")[0];

    if (role === "super admin") {
      let sqlQuery = "SELECT * FROM users WHERE deleted_at IS NULL";
      let sqlParams = [];
      if (search.trim() !== "") {
        sqlQuery +=
          " AND (username LIKE ? OR contact_no LIKE ? OR email LIKE ?)";
        sqlParams = Array(3).fill(`%${search}%`);
      }

      const [[{ totalCount }]] = await db.query(
        `SELECT COUNT(*) as totalCount FROM (${sqlQuery}) as countTable`,
        sqlParams
      );

      const [users] = await db.query(`${sqlQuery} LIMIT ? OFFSET ?`, [
        ...sqlParams,
        pageSize,
        offset,
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);

      return res.status(200).json({
        status: true,
        data: users,
        pagination: {
          totalDocs: totalCount,
          totalPages: totalPages,
          currentPage: parseInt(page),
          limit: pageSize,
        },
      });
    } else {
      let sqlQuery = `
      SELECT *
      FROM users
      WHERE email LIKE ? AND deleted_at IS NULL
    `;
      let sqlParams = [`%.${domainKeyword}@%`];
      if (search.trim() !== "") {
        sqlQuery +=
          " AND (username LIKE ? OR contact_no LIKE ? OR email LIKE ?)";
        sqlParams.push(...Array(3).fill(`%${search}%`));
      }

      const [[{ totalCount }]] = await db.query(
        `SELECT COUNT(*) as totalCount FROM (${sqlQuery}) as countTable`,
        sqlParams
      );

      const [users] = await db.query(`${sqlQuery} LIMIT ? OFFSET ?`, [
        ...sqlParams,
        pageSize,
        offset,
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);

      return res.status(200).json({
        status: true,
        data: users,
        pagination: {
          totalDocs: totalCount,
          totalPages: totalPages,
          currentPage: parseInt(page),
          limit: pageSize,
        },
      });
    }
  } else if (req.method === "POST") {
    const { name, email, password, username, contact_no } = req.body;
    const query = `
      SELECT email, username 
      FROM users 
      WHERE email = ? OR username = ?
    `;
    const [existingUser] = await db.query(query, [email, username]);

    if (existingUser.length > 0) {
      let errorMessage = "The following fields already exist:";
      if (existingUser.some((user) => user.email === email)) {
        errorMessage += " Email";
      }
      if (existingUser.some((user) => user.username === username)) {
        errorMessage += " Username";
      }
      return res.status(409).json({ status: false, message: errorMessage });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (
        name, email, password, username, contact_no, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [name, email, hashedPassword, username, contact_no]
    );
    
    const [insertedData] = await db.query("SELECT * FROM users WHERE id = ?", [
      result.insertId,
    ]);
   
   

    res.status(201).json({ status: true, user: insertedData });
  } else if (req.method === "PUT") {
    const Id = req.query.id;
    console.log(Id);

    const { name, email, contact_no } = req.body;
    console.log(req.body);

    const query = `
      SELECT email, contact_no 
      FROM users 
      WHERE (email = ? OR contact_no = ?) AND id != ?
    `;
    const [existingUser] = await db.query(query, [email, contact_no, Id]);

    if (existingUser.length > 0) {
      let errorMessage = "already exist following field:";
      if (existingUser.some((user) => user.email === email)) {
        errorMessage += " Email";
      }
      if (existingUser.some((user) => user.contact_no === contact_no)) {
        errorMessage += " Contact Number";
      }
      return res.status(409).json({ status: false, message: errorMessage });
    }

    const updateQuery = `
      UPDATE users SET
        name = ?, email = ?, contact_no = ?
      WHERE id = ?
    `;

    const [result] = await db.query(updateQuery, [name, email, contact_no, Id]);

    const [updatedData] = await db.query("SELECT * FROM users WHERE id = ?", [
      Id,
    ]);

    res.status(200).json({ status: true, user: updatedData });
  } else if (req.method === "DELETE") {
    const id = req.query.id;

    const [deleteResult] = await db.query(
      `UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`,
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
