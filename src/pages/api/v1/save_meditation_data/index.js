import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const data = req.body.data;
            const cid = req.body.company_id;
            const meditationList = data.map((item) => {
                const convertToNull = (value) => {
                    return value === "" ? null : value;
                };

                return {
                    user_id: convertToNull(item.user_id),
                    meditationId: convertToNull(item.meditationId),
                    meditation_perform_time: convertToNull(item.meditation_perform_time),
                    meditation_start_hr: convertToNull(item.meditation_start_hr),
                    meditation_end_hr: convertToNull(item.meditation_end_hr),
                    meditation_low_hr: convertToNull(item.meditation_low_hr),
                    meditation_day_avg_hr: convertToNull(item.meditation_day_avg_hr),
                    meditation_avg_hr: convertToNull(item.meditation_avg_hr),
                    meditation_time: convertToNull(item.meditation_time),
                    meditation_type: convertToNull(item.meditation_type),
                    dump_hr_details: convertToNull(item.dump_hr_details),
                    is_meditation_finished: convertToNull(item.is_meditation_finished),
                    is_updated: convertToNull(item.is_updated),
                    time_stamp: convertToNull(item.time_stamp),
                    created_time_stamp: convertToNull(item.created_time_stamp),
                    last_updated_time_stamp: convertToNull(item.last_updated_time_stamp),
                };
            });
            const tableName = `${cid}_meditation_data`;
            const insertOrderDetailQuery = `INSERT INTO ${tableName} SET ?`;
            const insert = meditationList.map(async (breath) => {
                return await db.query(insertOrderDetailQuery, breath);
            });
            const result = await Promise.all(insert)
            if (result.length === data.length) {
                res.status(200).json({
                    success: true,
                    message: "Meditation data insert operation successfully",
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Meditation data failed operation",
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
