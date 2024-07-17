import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../../database/dbConnection";
import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, role } = req.body;

    if (role === "super admin") {
      const [userRows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (userRows.length === 0) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      const user = userRows[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid password" });
      }

      return res.status(201).json({
        status: true,
        message: "Super admin login successful",
        user: userRows,
      });
    }

    console.log(req.body, "Received request body");

    const [userRows] = await db.query(
      `
    SELECT id, name, email, password, remember_token, created_at, updated_at, 
      contact_no, role, status, username, company_id, deleted_at, updated_by, 
      'users' as table_name,
      NULL as domain_name
FROM users
WHERE email = ?
UNION ALL
SELECT id, company_name as name, email, password, null as remember_token, created_at, updated_at, 
      null as contact_no, null as role, null as status, username, null as company_id, null as deleted_at, null as updated_by, 
      'company' as table_name,
      domain_name
FROM company
WHERE email = ?
      `,
      [email, email]
    );

    console.log(userRows, "User data from the database");

    if (userRows.length === 0) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const {
      id,
      name,
      email: userEmail,
      password: hashedPassword,
      table_name,
    } = userRows[0];

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ status: false, message: "Password is incorrect" });
    }

    console.log(isPasswordValid, "Valid password");

    const secretKey = process.env.JWT_KEY;
    const payload = { id, name, email: userEmail };
    const token = jwt.sign(payload, secretKey);

    res.status(201).json({
      status: true,
      user: {
        ...userRows[0],
        table_name,
      },
      token,
    });
  } else {
    res.status(405).json({ status: false, error: "Method Not Allowed" });
  }
});
