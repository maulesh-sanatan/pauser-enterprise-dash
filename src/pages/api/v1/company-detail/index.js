import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import jwt from "jsonwebtoken";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, age, weight, zip_code, country, max_alert, is_first_launch, last_hr_entry, last_hr_entry_timeStamp, refresh_timeStamp, pauses_goal, duration_goal, company_name, watch_name, registered_time, login_time, last_seen, login_type, platform, company_identity } = req.body;
    const [userRows] = await db.query(`SELECT * FROM company WHERE company_identity = '${company_identity}'`);
    if(userRows.length > 0){
        const comp_id = userRows[0].id;
        const tableName = `${comp_id}_users`;
        const convertToNull = (value) => { return value === "" ? null : value; };
        try{
          const [checkUsers] = await db.query(`SELECT * FROM ${tableName} WHERE email = '${email}'`);
          if(checkUsers.length > 0){
            const updateUserQuery = `UPDATE ${tableName} SET name = ?, age = ?, weight = ?, zip_code = ?, country = ?, max_alert = ?, is_first_launch = ?, last_hr_entry = ?, last_hr_entry_timeStamp = ?, refresh_timeStamp = ?, pauses_goal = ?, duration_goal = ?, company_name = ?, watch_name = ?, registered_time = ?, login_time = ?, last_seen = ?, login_type = ?, platform = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ? AND id = ?`;

            const updateValues = [name, convertToNull(age), convertToNull(weight), convertToNull(zip_code), convertToNull(country), convertToNull(max_alert), convertToNull(is_first_launch), convertToNull(last_hr_entry), convertToNull(last_hr_entry_timeStamp), convertToNull(refresh_timeStamp), convertToNull(pauses_goal), convertToNull(duration_goal), convertToNull(company_name), convertToNull(watch_name), convertToNull(registered_time), convertToNull(login_time), convertToNull(last_seen), convertToNull(login_type), convertToNull(platform), email, checkUsers[0].id];

            const [updateResult] = await db.query(updateUserQuery, updateValues);
                            
              const token = jwt.sign(
                { userId: checkUsers[0].id },
                process.env.JWT_SECRET
              );
              return res.status(200).json({
                success: true,
                message: "User data update successfully",
                data: { userId: checkUsers[0].id, comapny_id: comp_id, token: token },
              });
          }else{
            console.log("insert");
            const insertQuery = `INSERT INTO ${tableName} (name, company_id, email, age, weight, zip_code, country, max_alert,
                     is_first_launch, last_hr_entry, last_hr_entry_timeStamp, refresh_timeStamp,
                     pauses_goal, duration_goal, company_name, watch_name, registered_time,
                     login_time, last_seen, login_type, platform, created_at, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                 `;
            const insertValues = [name, comp_id, email,  convertToNull(age),  convertToNull(weight),  convertToNull(zip_code),  convertToNull(country),  convertToNull(max_alert),  convertToNull(is_first_launch),  convertToNull(last_hr_entry),  convertToNull(last_hr_entry_timeStamp),  convertToNull(refresh_timeStamp),  convertToNull(pauses_goal),  convertToNull(duration_goal),  convertToNull(company_name),  convertToNull(watch_name),  convertToNull(registered_time),  convertToNull(login_time),  convertToNull(last_seen),  convertToNull(login_type),  convertToNull(platform)];

            const [insertResult] = await db.query(insertQuery, insertValues);

            

            const token = jwt.sign({ userId: insertResult.insertId },process.env.JWT_SECRET);
            return res.status(200).json({
              success: true,
              message: "User data saved successfully",
              data: { userId: insertResult[0].id, comapny_id: comp_id, token: token },
            });
          }
          // db.query(`SELECT * FROM ${tableName} WHERE email = ?`, [email], (err, rows) => {
          //     if (err) {
          //       console.error("Error checking user existence:", err);
          //       return res.status(500).json({
          //         success: false,
          //         message: "Failed to check user existence",
          //       });
          //     }
            
          //     if (rows.length > 0) {
          //       const updateUserQuery = `
          //         UPDATE ${tableName} SET
          //           name = ?,
          //           age = ?,
          //           weight = ?,
          //           zip_code = ?,
          //           country = ?,
          //           max_alert = ?,
          //           is_first_launch = ?,
          //           last_hr_entry = ?,
          //           last_hr_entry_timeStamp = ?,
          //           refresh_timeStamp = ?,
          //           pauses_goal = ?,
          //           duration_goal = ?,
          //           company_name = ?,
          //           watch_name = ?,
          //           registered_time = ?,
          //           login_time = ?,
          //           last_seen = ?,
          //           login_type = ?,
          //           platform = ?,
          //           updated_at = CURRENT_TIMESTAMP
          //         WHERE email = ?
          //       `;
              
          //       const updateValues = [
          //         name,
          //         age,
          //         weight,
          //         zip_code,
          //         country,
          //         max_alert,
          //         is_first_launch,
          //         last_hr_entry,
          //         last_hr_entry_timeStamp,
          //         refresh_timeStamp,
          //         pauses_goal,
          //         duration_goal,
          //         company_name,
          //         watch_name,
          //         registered_time,
          //         login_time,
          //         last_seen,
          //         login_type,
          //         platform,
          //         email,
          //       ];
              
          //       db.query(updateUserQuery, updateValues, (updateErr, updateResult) => {
          //         if (updateErr) {
          //           console.error("Error updating user data:", updateErr);
          //           return res.status(500).json({
          //             success: false,
          //             message: "Failed to update user data",
          //           });
          //         }
                
          //         const token = jwt.sign(
          //           { userId: rows[0].id },
          //           process.env.JWT_SECRET
          //         );
                
          //         console.log("User data updated successfully:", updateResult);
          //         return res.status(200).json({
          //           success: true,
          //           message: "User data updated successfully",
          //           data: { userId: rows[0].id, token: token },
          //         });
          //       });
          //     } else {
          //       const insertQuery = `
          //         INSERT INTO ${tableName} 
          //           (name, email, age, weight, zip_code, country, max_alert,
          //           is_first_launch, last_hr_entry, last_hr_entry_timeStamp, refresh_timeStamp,
          //           pauses_goal, duration_goal, company_name, watch_name, registered_time,
          //           login_time, last_seen, login_type, platform, created_at, updated_at)
          //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          //       `;
              
          //       const insertValues = [
          //         name,
          //         email,
          //         age,
          //         weight,
          //         zip_code,
          //         country,
          //         max_alert,
          //         is_first_launch,
          //         last_hr_entry,
          //         last_hr_entry_timeStamp,
          //         refresh_timeStamp,
          //         pauses_goal,
          //         duration_goal,
          //         company_name,
          //         watch_name,
          //         registered_time,
          //         login_time,
          //         last_seen,
          //         login_type,
          //         platform,
          //       ];
              
          //       db.query(insertQuery, insertValues, (insertErr, insertResult) => {
          //         if (insertErr) {
          //           console.error("Error inserting user data:", insertErr);
          //           return res.status(500).json({
          //             success: false,
          //             message: "Failed to save user data",
          //           });
          //         }
                
          //         const token = jwt.sign(
          //           { userId: insertResult.insertId },
          //           process.env.JWT_SECRET
          //         );
                
          //         console.log("User data saved successfully:", insertResult);
          //         return res.status(200).json({
          //           success: true,
          //           message: "User data saved successfully",
          //           data: { userId: rows[0].id, token: token },
          //         });
          //       });
          //     }
          //   });
          // const userData = userRows;

        // res.status(200).json({
        //   status: true,
        //   data: userData,
        // });
        }catch(e){
          res.status(200).json({
            status: false,
            message: e.message,
            data: []
          });
        }
        }else{


          res.status(200).json({
            status: false,
            message: "Comapny not found based on given company identity",
            data: []
          });
        
      }
    
    
  }
});
