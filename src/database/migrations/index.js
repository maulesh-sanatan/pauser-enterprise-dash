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
export async function createAppAccessLogTable(tableName) {
  try {
    await db.query(`
    CREATE TABLE ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT DEFAULT NULL,
      activity_time VARCHAR(255) DEFAULT NULL,
      activity_date VARCHAR(255) DEFAULT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NULL DEFAULT NULL
    )
      `);
    console.log("HR Dump table created successfully");
  } catch (error) {
    console.error("Error creating HR Dump table:", error);
  }
}
export async function createHeartRateSessionsTable(tableName) {
  try {
    await db.query(`
      CREATE TABLE ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT NULL,
        sessionId BIGINT DEFAULT NULL,
        max_heart_rate BIGINT DEFAULT NULL,
        min_heart_rate BIGINT DEFAULT NULL,
        latitude DOUBLE DEFAULT NULL,
        longitude DOUBLE DEFAULT NULL,
        mood_type LONGTEXT COLLATE utf8mb4_general_ci,
        step_count BIGINT DEFAULT NULL,
        pause_count BIGINT DEFAULT NULL,
        glucose INT DEFAULT NULL,
        blood_pressure INT DEFAULT NULL,
        oxygen INT DEFAULT NULL,
        app_usage LONGTEXT COLLATE utf8mb4_general_ci,
        note LONGTEXT COLLATE utf8mb4_general_ci,
        note_info_1 LONGTEXT COLLATE utf8mb4_general_ci,
        tag_name LONGTEXT COLLATE utf8mb4_general_ci,
        tag_id BIGINT DEFAULT NULL,
        archive_reason LONGTEXT COLLATE utf8mb4_general_ci,
        signal_hr_detail LONGTEXT COLLATE utf8mb4_general_ci,
        is_active BIGINT DEFAULT NULL,
        is_deleted BIGINT DEFAULT NULL,
        is_updated BIGINT DEFAULT NULL,
        is_updated_on_server BIGINT DEFAULT NULL,
        time_stamp BIGINT DEFAULT NULL,
        created_time_stamp BIGINT DEFAULT NULL,
        last_updated_time_stamp BIGINT DEFAULT NULL,
        start_time_stamp BIGINT DEFAULT NULL,
        end_time_stamp BIGINT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL
    );
    
      `);
    console.log("HR Dump table created successfully");
  } catch (error) {
    console.error("Error creating HR Dump table:", error);
  }
}
export async function createBreathDataTable(tableName) {
  try {
    await db.query(`
    CREATE TABLE ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT DEFAULT NULL,
      breathId INT DEFAULT NULL,
      breath_perform_time INT DEFAULT NULL,
      breath_start_hr INT DEFAULT NULL,
      breath_end_hr INT DEFAULT NULL,
      breath_low_hr INT DEFAULT NULL,
      breath_day_avg_hr INT DEFAULT NULL,
      breath_avg_hr INT DEFAULT NULL,
      breath_time INT DEFAULT NULL,
      breath_type LONGTEXT,
      breath_pattern LONGTEXT,
      breath_cycle LONGTEXT,
      breath_cycle_length INT DEFAULT NULL,
      breath_inhale INT DEFAULT NULL,
      breath_exhale INT DEFAULT NULL,
      breath_hold INT DEFAULT NULL,
      dump_hr_details LONGTEXT,
      prana_flow_details LONGTEXT,
      is_breath_finished INT DEFAULT NULL,
      is_updated INT DEFAULT NULL,
      time_stamp TEXT,
      created_time_stamp TEXT,
      last_updated_time_stamp TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NULL DEFAULT NULL,
      deleted_at TIMESTAMP NULL DEFAULT NULL
  );
  
    
      `);
    console.log("HR Dump table created successfully");
  } catch (error) {
    console.error("Error creating HR Dump table:", error);
  }
}
export async function createMeditationDataTable(tableName) {
  try {
    await db.query(`
   
    CREATE TABLE ${tableName} (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  meditationId VARCHAR(255) DEFAULT NULL,
  meditation_perform_time VARCHAR(255) DEFAULT NULL,
  meditation_start_hr VARCHAR(255) DEFAULT NULL,
  meditation_end_hr VARCHAR(255) DEFAULT NULL,
  meditation_low_hr VARCHAR(255) DEFAULT NULL,
  meditation_day_avg_hr VARCHAR(255) DEFAULT NULL,
  meditation_avg_hr VARCHAR(255) DEFAULT NULL,
  meditation_time VARCHAR(255) DEFAULT NULL,
  meditation_type VARCHAR(255) DEFAULT NULL,
  dump_hr_details VARCHAR(255) DEFAULT NULL,
  is_meditation_finished VARCHAR(255) DEFAULT NULL,
  is_updated VARCHAR(255) DEFAULT NULL,
  time_stamp VARCHAR(255) DEFAULT NULL,
  created_time_stamp VARCHAR(255) DEFAULT NULL,
  last_updated_time_stamp VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  delete_at TIMESTAMP DEFAULT NULL
      );
      `);

    console.log("HR Dump table created successfully");
  } catch (error) {
    console.error("Error creating HR Dump table:", error);
  }
}
export async function createUserTable(tableName) {
  try {
    await db.query(`
   
    CREATE TABLE ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT,
      name VARCHAR(255) DEFAULT NULL,
      username VARCHAR(50) DEFAULT NULL,
      email VARCHAR(255) DEFAULT NULL,
      password VARCHAR(255) DEFAULT NULL,
      mobile_no varchar(13) DEFAULT NULL,
      age varchar(10) DEFAULT NULL,
      weight varchar(50) DEFAULT NULL,
      zip_code varchar(10) DEFAULT NULL,
      country varchar(50) DEFAULT NULL,
      max_alert int DEFAULT NULL,
      is_first_launch tinyint(1) DEFAULT NULL,
      last_hr_entry int DEFAULT NULL,
      last_hr_entry_timeStamp int DEFAULT NULL,
      refresh_timeStamp int DEFAULT NULL,
      pauses_goal varchar(255) DEFAULT NULL,
      duration_goal varchar(255) DEFAULT NULL,
      company_name varchar(255) DEFAULT NULL,
      watch_name varchar(255) DEFAULT NULL,
      registered_time timestamp NULL DEFAULT NULL,
      login_time timestamp NULL DEFAULT NULL,
      last_seen bigint DEFAULT NULL,
      contact_no VARCHAR(15) DEFAULT NULL,
      role VARCHAR(50) DEFAULT NULL,
      status VARCHAR(50) DEFAULT NULL,
      domain_name VARCHAR(255) DEFAULT NULL,
      login_type varchar(50) DEFAULT NULL,
      platform varchar(50) DEFAULT NULL,
      updated_by VARCHAR(50) DEFAULT NULL,
      remember_token VARCHAR(100) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP
  );
      `);
    console.log("HR Dump table created successfully");
  } catch (error) {
    console.error("Error creating HR Dump table:", error);
  }
}
export async function createMonitorTable(tableName) {
  try {
    await db.query(`
   
    CREATE TABLE ${tableName} (
      id int NOT NULL AUTO_INCREMENT,
      user_id int DEFAULT NULL,
      sessionId bigint DEFAULT NULL,
      session_perform_time bigint DEFAULT NULL,
      session_start_hr bigint DEFAULT NULL,
      session_end_hr bigint DEFAULT NULL,
      session_low_hr bigint DEFAULT NULL,
      session_high_hr bigint DEFAULT NULL,
      session_avg_hr bigint DEFAULT NULL,
      session_day_avg_hr bigint DEFAULT NULL,
      session_time bigint DEFAULT NULL,
      session_name longtext COLLATE utf8mb4_general_ci,
      row_hr_details longtext COLLATE utf8mb4_general_ci,
      is_archived bigint DEFAULT NULL,
      is_updated bigint DEFAULT NULL,
      time_stamp bigint DEFAULT NULL,
      created_time_stamp bigint DEFAULT NULL,
      last_updated_time_stamp bigint DEFAULT NULL,
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp NULL DEFAULT NULL,
      deleted_at timestamp NULL DEFAULT NULL,
      PRIMARY KEY (id)
    );
    
      `);
    console.log("HR Dump table created successfully");
  } catch (error) {
    console.error("Error creating HR Dump table:", error);
  }
}
