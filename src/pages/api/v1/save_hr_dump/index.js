import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body.data;
      const cid = req.body.company_id;
      const dumpList = data.map((item) => {
        const convertToNull = (value) => {
          return value === "" ? null : value;
        };
        return {
          user_id: convertToNull(item.user_id),
          hrDumpId: convertToNull(item.hrDumpId),
          time_stamp: convertToNull(item.time_stamp),
          created_time_stamp: convertToNull(item.created_time_stamp),
          last_updated_time_stamp: convertToNull(item.last_updated_time_stamp),
          heart_rate: convertToNull(item.heart_rate),
          resting_heart: convertToNull(item.resting_heart),
          average_heart: convertToNull(item.average_heart),
          latitude: convertToNull(item.latitude),
          longitude: convertToNull(item.longitude),
          currDate: convertToNull(item.currDate),
          tag_id: convertToNull(item.tag_id),
          step: convertToNull(item.step),
          sugar: convertToNull(item.sugar),
          blood_pressure: convertToNull(item.blood_pressure),
          tag_name: convertToNull(item.tag_name),
          oxygen: convertToNull(item.oxygen),
          weather: convertToNull(item.weather),
          weather_pause: convertToNull(item.weather_pause),
          pollen: convertToNull(item.pollen),
          pollen_pause: convertToNull(item.pollen_pause),
          refresh_timeStamp: convertToNull(item.refresh_timeStamp),
          state: convertToNull(item.state),
          pause: convertToNull(item.pause),
          pauser_used_last_time: convertToNull(item.pauser_used_last_time),
        };
      });
      const tableName = `${cid}_hr_dump`;
      const insertOrderDetailQuery = `INSERT INTO ${tableName} SET ?`;
      const insert = dumpList.map(async (breath) => {
        return await db.query(insertOrderDetailQuery, breath);
      });
      const result = await Promise.all(insert);
      if (result.length === data.length) {
        res.status(200).json({
          success: true,
          message: "user app access log insert operation successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "user app access log operation failed.",
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
