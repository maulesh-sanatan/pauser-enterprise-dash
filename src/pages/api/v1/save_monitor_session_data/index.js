import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body.data;
      const cid = req.body.company_id;
      const monitorSessionList = data.map((item) => {
        const convertToNull = (value) => {
          return value === "" ? null : value;
        };
        return {
          user_id: convertToNull(item.user_id),
          sessionId: convertToNull(item.sessionId),
          session_perform_time: convertToNull(item.session_perform_time),
          session_start_hr: convertToNull(item.session_start_hr),
          session_end_hr: convertToNull(item.session_end_hr),
          session_low_hr: convertToNull(item.session_low_hr),
          session_high_hr: convertToNull(item.session_high_hr),
          session_avg_hr: convertToNull(item.session_avg_hr),
          session_day_avg_hr: convertToNull(item.session_day_avg_hr),
          session_time: convertToNull(item.session_time),
          session_name: convertToNull(item.session_name),
          row_hr_details: convertToNull(item.row_hr_details),
          is_archived: convertToNull(item.is_archived),
          is_updated: convertToNull(item.is_updated),
          time_stamp: convertToNull(item.time_stamp),
          created_time_stamp: convertToNull(item.created_time_stamp),
          last_updated_time_stamp: convertToNull(item.last_updated_time_stamp),
        };
      });
      const tableName = `${cid}_monitor_session_data`;
      const insertOrderDetailQuery = `INSERT INTO ${tableName} SET ?`;
      const insert = monitorSessionList.map(async (breath) => {
        return await db.query(insertOrderDetailQuery, breath);
      });
      const result = await Promise.all(insert);
      if (result.length === data.length) {
        res.status(200).json({
          success: true,
          message: "Monitor session data insert operation successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Monitor session data failed operation",
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
});
