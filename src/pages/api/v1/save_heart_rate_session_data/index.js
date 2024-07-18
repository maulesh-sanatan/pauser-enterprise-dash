import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const data = req.body.data;
            const cid = req.body.company_id;
            const heartRateSessionList = data.map((item) => {
              const convertToNull = (value) => {
                return value === "" ? null : value;
              };
              return {
                user_id: convertToNull(item.user_id),
                sessionId: convertToNull(item.alertSessionId),
                max_heart_rate: convertToNull(item.max_heart_rate),
                min_heart_rate: convertToNull(item.min_heart_rate),
                latitude: convertToNull(item.latitude),
                longitude: convertToNull(item.longitude),
                mood_type: convertToNull(item.mood_type),
                step_count: convertToNull(item.step_count),
                pause_count: convertToNull(item.pause_count),
                glucose: convertToNull(item.glucose),
                blood_pressure: convertToNull(item.blood_pressure),
                oxygen: convertToNull(item.oxygen),
                app_usage: convertToNull(item.app_usage),
                note: convertToNull(item.note),
                note_info_1: convertToNull(item.note_info_1),
                tag_name: convertToNull(item.tag_name),
                tag_id: convertToNull(item.tag_id),
                archive_reason: convertToNull(item.archive_reason),
                signal_hr_detail: convertToNull(item.signal_hr_detail),
                is_active: convertToNull(item.is_active),
                is_deleted: convertToNull(item.is_deleted),
                is_updated: convertToNull(item.is_updated),
                is_updated_on_server: convertToNull(item.is_updated_on_server),
                start_time_stamp: convertToNull(item.start_time_stamp),
                end_time_stamp: convertToNull(item.end_time_stamp),
                time_stamp: convertToNull(item.time_stamp),
                created_time_stamp: convertToNull(item.created_time_stamp),
                last_updated_time_stamp: convertToNull(item.last_updated_time_stamp),
              };
            });
            const tableName = `${cid}_heart_rate_session`;
            const insertOrderDetailQuery = `INSERT INTO ${tableName} SET ?`;
            const insert = heartRateSessionList.map(async (breath) => {
                return await db.query(insertOrderDetailQuery, breath);
            });
            const result = await Promise.all(insert)
            if (result.length === data.length) {
                res.status(200).json({
                  success: true,
                    message: "Heart rate session data insert operation successfully",
                });
            } else {
                res.status(500).json({
                  success: false,
                    message: "Heart rate session data failed operation",
                });
            }
            
           
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
          }
    }
});



