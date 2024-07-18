import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body.data;
      const cid = req.body.company_id;
      console.log(cid);
      const userAppAccessLogList = data.map((item) => {
        const convertToNull = (value) => {
          return value === "" ? null : value;
        };
        return {
          user_id : convertToNull(item.user_id),
          activity_time : convertToNull(item.activity_time),
          activity_date : convertToNull(item.activity_date)
        };
      });

      const tableName = `${cid}_user_app_access_log`;
      const insertOrderDetailQuery = `INSERT INTO ${tableName} SET ?`;
      
      const insert = userAppAccessLogList.map(async(breath) => {
          return await db.query(insertOrderDetailQuery, breath);
      });
      const result = await Promise.all(insert)
      if(result.length === data.length){
        res.status(200).json({
          success: true,
          message: "user app access log insert operation successfully",
        });
      }else{
        res.status(500).json({
          success: false,
          message: "user app access log operation failed.",
        });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
});
