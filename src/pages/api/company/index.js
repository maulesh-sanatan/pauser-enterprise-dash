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

    let sqlQuery = "SELECT * FROM company";
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
  }
  else if (req.method === "POST") {
    const { name, email, password, username, domain } = req.body;
    console.log(req.body, "req.body");

    try {
      const query = `
        SELECT email, username 
        FROM new_pauser.company 
        WHERE email = ? OR username = ?
      `;
      const [existingUser] = await db.query(query, [email, username]);

      if (existingUser.length > 0) {
        let errorMessage = "already exist following field:";
        if (existingUser.some((user) => user.email === email)) {
          errorMessage += " Email";
        }
        if (existingUser.some((user) => user.username === username)) {
          errorMessage += " Username";
        }
        return res.status(409).json({ status: false, message: errorMessage });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const secretkey = process.env.JWT_KEY;
      const token = jwt.sign({ email, username }, secretkey);

      const [result] = await db.query(
        `INSERT INTO company (
          company_name, email, password, username, domain_name
        ) VALUES (?, ?, ?, ?, ?)`,
        [name, email, hashedPassword, username, domain]
      );

      const [insertedData] = await db.query(
        "SELECT * FROM company WHERE id = ?",
        [result.insertId]
      );

      res.status(200).json({ status: true, user: insertedData, token });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  }
  else if (req.method === "PUT") {
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
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});