import db from "../dbConnection";

export async function createAppUsageTable(tableName) {
  try {
    await db.query(`
    CREATE TABLE ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        -- pauser_id INT DEFAULT NULL,
        user_id INT DEFAULT NULL,
        appid VARCHAR(255),
        app_name VARCHAR(255),
        package_name VARCHAR(255),
        time_used VARCHAR(255),
        start_time VARCHAR(255),
        end_time VARCHAR(255),
        app_icon VARCHAR(255),
        package_name_time_stamp VARCHAR(255),
        -- state VARCHAR(255),
        -- is_updated INT DEFAULT NULL,
        created_time_stamp VARCHAR(255),
        last_updated_time_stamp VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    
    `);

    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}
export async function createHRDumpTable(tableName) {
  try {
    await db.query(`
        CREATE TABLE ${tableName} (
          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          user_id INT DEFAULT NULL,
          time_stamp VARCHAR(255),
          currDate VARCHAR(255),
          heart_rate INT DEFAULT NULL,
          resting_heart INT DEFAULT NULL,
          average_heart INT DEFAULT NULL,
          tag_id INT DEFAULT NULL,
          step INT DEFAULT NULL,
          sugar INT DEFAULT NULL,
          blood_pressure INT DEFAULT NULL,
          latitude VARCHAR(255),
          longitude VARCHAR(255),
          tag_name VARCHAR(255),
          oxygen INT DEFAULT NULL,
          weather VARCHAR(255),
          weather_pause INT DEFAULT NULL,
          pollen VARCHAR(255),
          pollen_pause INT DEFAULT NULL,
          state INT DEFAULT NULL,
          refresh_timeStamp INT DEFAULT NULL,
          pause INT DEFAULT NULL,
          pauser_used_last_time VARCHAR(255),
          created_time_stamp BIGINT DEFAULT NULL,
          last_updated_time_stamp BIGINT DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    console.log("HR Dump table created successfully");
  } catch (error) {
    console.error("Error creating HR Dump table:", error);
  }
}
