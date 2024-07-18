import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body.data;
      const cid = req.body.company_id;
      console.log(cid);
      const breathList = data.map((item) => {
        const convertToNull = (value) => {
          return value === "" ? null : value;
        };
        return {
          user_id: convertToNull(item.user_id),
          breathId: convertToNull(item.breathId),
          breath_perform_time: convertToNull(item.breath_perform_time),
          breath_start_hr: convertToNull(item.breath_start_hr),
          breath_end_hr: convertToNull(item.breath_end_hr),
          breath_low_hr: convertToNull(item.breath_low_hr),
          breath_day_avg_hr: convertToNull(item.breath_day_avg_hr),
          breath_avg_hr: convertToNull(item.breath_avg_hr),
          breath_time: convertToNull(item.breath_time),
          breath_type: convertToNull(item.breath_type),
          breath_pattern: convertToNull(item.breath_pattern),
          breath_cycle: convertToNull(item.breath_cycle),
          breath_cycle_length: convertToNull(item.breath_cycle_length),
          breath_inhale: convertToNull(item.breath_inhale),
          breath_exhale: convertToNull(item.breath_exhale),
          breath_hold: convertToNull(item.breath_hold),
          dump_hr_details: convertToNull(item.dump_hr_details),
          prana_flow_details: convertToNull(item.prana_flow_details),
          is_breath_finished: convertToNull(item.is_breath_finished),
          is_updated: convertToNull(item.is_updated),
          time_stamp: convertToNull(item.time_stamp),
          created_time_stamp: convertToNull(item.created_time_stamp),
          last_updated_time_stamp: convertToNull(item.last_updated_time_stamp),
        };
      });

      const tableName = `${cid}_breath_data`;
      const insertOrderDetailQuery = `INSERT INTO ${tableName} SET ?`;
      
      const insert = breathList.map(async(breath) => {
          return await db.query(insertOrderDetailQuery, breath);
      });
      const result = await Promise.all(insert)
      if(result.length === data.length){
        res.status(200).json({
          success: true,
          message: "Breath data insert operation successfully",
        });
      }else{
        res.status(500).json({
          success: false,
          message: "Breath data failed operation",
        });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
});
