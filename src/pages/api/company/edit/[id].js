import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";


export default asyncErrorHandler(async function handler(req, res) {
  const { id } = req.query;
  console.log(id, "id");
  if (req.method === "GET") {
    const [userRows] = await db.query(
      "SELECT * FROM company WHERE id = ?",
      [id]
    );
    const userData = userRows[0];
    console.log(userRows, "userRowsb");
    res.status(201).json({
      status: true,
      data: userData,
    });
  } else if (req.method === "PUT") {
    console.log(req.body, "bodyyyy");
    const { name, email, username, contact_no } = req.body;
    // const [existingUser] = await db.query(
    //   "SELECT id FROM users WHERE contact_no = ?",
    //   [contact_no]
    // );

    // if (existingUser < 0) {
    //   return res
    //     .status(409)
    //     .json({
    //       status: false,
    //       message: "already exist following field:phone number",
    //     });
    // }
    const img = req?.files[0]?.path;

    const [data] = await db.query(
      `UPDATE users 
          SET name = ?, email = ?, username = ?, contact_no = ?, 
          WHERE id = ?`,
      [name, email, username, contact_no, id]
    );
    res.status(201).json({
      status: true,
      data: data,
    });
  }
});
