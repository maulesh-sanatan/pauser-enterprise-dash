import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import db from "../../../../database/dbConnection";

export default asyncErrorHandler(async function handler(req, res) {
  if (req.method === "POST") {
    try {
        const data = req.body.data;
        const cid = req.body.company_id;
        const appUsageList = data.map((item) => {
          const convertToNull = (value) => {
            return value === "" ? null : value;
          };
          
          return {
            user_id : convertToNull(item.user_id),
            // pauser_id : convertToNull(item.pauser_id),
            app_name : convertToNull(item.app_name),
            package_name : convertToNull(item.package_name),
            time_used : convertToNull(item.time_used),
            start_time : convertToNull(item.start_time),
            end_time : convertToNull(item.end_time),
            package_name_time_stamp : convertToNull(item.package_name_time_stamp),
            // state : convertToNull(item.state),
            app_icon: convertToNull(item.app_icon),
            created_time_stamp : convertToNull(item.created_time_stamp),
            last_updated_time_stamp : convertToNull(item.last_updated_time_stamp),
            // is_updated : convertToNull(item.is_updated),
            appid : convertToNull(item.appId)
          }
         
        });
        const tableName = `${cid}_app_usage`;
        const insertOrderDetailQuery = `INSERT INTO ${tableName} SET ?`;
        const insert = appUsageList.map(async(breath) => {
            return await db.query(insertOrderDetailQuery, breath);
        });
        const result = await Promise.all(insert)
        if(result.length === data.length){
          res.status(200).json({
            success: true,
            message: "App usage insert operation successfully",
          });
        }else{
          res.status(500).json({
            success: false,
            message: "App usage failed operation",
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
  }
});






