import db from "../dbConnection";

export async function createAppUsageTable(tableName) {
  try {
    await db.query(`
    CREATE TABLE ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        -- pauser_id INT DEFAULT NULL,
        user_id INT DEFAULT NULL,
        appid LONGTEXT,
        app_name LONGTEXT,
        package_name LONGTEXT,
        time_used LONGTEXT,
        start_time LONGTEXT,
        end_time LONGTEXT,
        app_icon LONGTEXT,
        package_name_time_stamp LONGTEXT,
        -- state LONGTEXT,
        -- is_updated INT DEFAULT NULL,
        created_time_stamp LONGTEXT,
        last_updated_time_stamp LONGTEXT,
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
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT NULL,
        hrDumpId VARCHAR(255) DEFAULT NULL,
        time_stamp VARCHAR(255) DEFAULT NULL,
        currDate VARCHAR(255) DEFAULT NULL,
        heart_rate LONGTEXT DEFAULT NULL,
        resting_heart LONGTEXT DEFAULT NULL,
        average_heart LONGTEXT DEFAULT NULL,
        tag_id LONGTEXT DEFAULT NULL,
        step LONGTEXT DEFAULT NULL,
        sugar LONGTEXT DEFAULT NULL,
        blood_pressure LONGTEXT DEFAULT NULL,
        latitude VARCHAR(255) DEFAULT NULL,
        longitude VARCHAR(255) DEFAULT NULL,
        tag_name VARCHAR(255) DEFAULT NULL,
        oxygen LONGTEXT DEFAULT NULL,
        weather VARCHAR(255) DEFAULT NULL,
        weather_pause LONGTEXT DEFAULT NULL,
        pollen LONGTEXT DEFAULT NULL,
        pollen_pause LONGTEXT DEFAULT NULL,
        state LONGTEXT DEFAULT NULL,
        refresh_timeStamp LONGTEXT DEFAULT NULL,
        pause LONGTEXT DEFAULT NULL,
        pauser_used_last_time VARCHAR(255) DEFAULT NULL,
        created_time_stamp VARCHAR(255) DEFAULT NULL,
        last_updated_time_stamp VARCHAR(255) DEFAULT NULL,
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
      activity_time LONGTEXT DEFAULT NULL,
      activity_date LONGTEXT DEFAULT NULL,
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
        sessionId VARCHAR(255) DEFAULT NULL,
        max_heart_rate VARCHAR(255) DEFAULT NULL,
        min_heart_rate VARCHAR(255) DEFAULT NULL,
        latitude VARCHAR(255) DEFAULT NULL,
        longitude VARCHAR(255) DEFAULT NULL,
        mood_type VARCHAR(255) DEFAULT NULL,
        step_count VARCHAR(255) DEFAULT NULL,
        pause_count VARCHAR(255) DEFAULT NULL,
        glucose VARCHAR(255) DEFAULT NULL,
        blood_pressure VARCHAR(255) DEFAULT NULL,
        oxygen VARCHAR(255) DEFAULT NULL,
        app_usage VARCHAR(255) DEFAULT NULL,
        note VARCHAR(255) DEFAULT NULL,
        note_info_1 VARCHAR(255) DEFAULT NULL,
        tag_name VARCHAR(255) DEFAULT NULL,
        tag_id VARCHAR(255) DEFAULT NULL,
        archive_reason VARCHAR(255) DEFAULT NULL,
        signal_hr_detail LONGTEXT DEFAULT NULL,
        is_active VARCHAR(255) DEFAULT NULL,
        is_deleted VARCHAR(255) DEFAULT NULL,
        is_updated VARCHAR(255) DEFAULT NULL,
        is_updated_on_server VARCHAR(255) DEFAULT NULL,
        time_stamp VARCHAR(255) DEFAULT NULL,
        created_time_stamp VARCHAR(255) DEFAULT NULL,
        last_updated_time_stamp VARCHAR(255) DEFAULT NULL,
        start_time_stamp VARCHAR(255) DEFAULT NULL,
        end_time_stamp VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL
      );
    `);
    console.log("Heart rate session table created successfully");
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
    breathId VARCHAR(255) DEFAULT NULL,
    breath_perform_time VARCHAR(255) DEFAULT NULL,
    breath_start_hr VARCHAR(255) DEFAULT NULL,
    breath_end_hr VARCHAR(255) DEFAULT NULL,
    breath_low_hr VARCHAR(255) DEFAULT NULL,
    breath_day_avg_hr VARCHAR(255) DEFAULT NULL,
    breath_avg_hr VARCHAR(255) DEFAULT NULL,
    breath_time VARCHAR(255) DEFAULT NULL,
    breath_type VARCHAR(255) DEFAULT NULL,
    breath_pattern VARCHAR(255) DEFAULT NULL,
    breath_cycle VARCHAR(255) DEFAULT NULL,
    breath_cycle_length VARCHAR(255) DEFAULT NULL,
    breath_inhale VARCHAR(255) DEFAULT NULL,
    breath_exhale VARCHAR(255) DEFAULT NULL,
    breath_hold VARCHAR(255) DEFAULT NULL,
    dump_hr_details LONGTEXT DEFAULT NULL,
    prana_flow_details LONGTEXT DEFAULT NULL,
    is_breath_finished VARCHAR(255) DEFAULT NULL,
    is_updated VARCHAR(255) DEFAULT NULL,
    time_stamp VARCHAR(255) DEFAULT NULL,
    created_time_stamp VARCHAR(255) DEFAULT NULL,
    last_updated_time_stamp VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL
  );
  
    
      `);
    console.log("Breath table created successfully");
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
      dump_hr_details LONGTEXT DEFAULT NULL,
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
      name LONGTEXT DEFAULT NULL,
      username VARCHAR(50) DEFAULT NULL,
      email LONGTEXT DEFAULT NULL,
      password LONGTEXT DEFAULT NULL,
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
      pauses_goal LONGTEXT DEFAULT NULL,
      duration_goal LONGTEXT DEFAULT NULL,
      company_name LONGTEXT DEFAULT NULL,
      watch_name LONGTEXT DEFAULT NULL,
      registered_time timestamp NULL DEFAULT NULL,
      login_time timestamp NULL DEFAULT NULL,
      last_seen bigint DEFAULT NULL,
      contact_no VARCHAR(15) DEFAULT NULL,
      role VARCHAR(50) DEFAULT NULL,
      status VARCHAR(50) DEFAULT NULL,
      domain_name LONGTEXT DEFAULT NULL,
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
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT NULL,
        sessionId VARCHAR(255) DEFAULT NULL,
        session_perform_time VARCHAR(255) DEFAULT NULL,
        session_start_hr VARCHAR(255) DEFAULT NULL,
        session_end_hr VARCHAR(255) DEFAULT NULL,
        session_low_hr VARCHAR(255) DEFAULT NULL,
        session_high_hr VARCHAR(255) DEFAULT NULL,
        session_avg_hr VARCHAR(255) DEFAULT NULL,
        session_day_avg_hr VARCHAR(255) DEFAULT NULL,
        session_time VARCHAR(255) DEFAULT NULL,
        session_name VARCHAR(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
        row_hr_details LONGTEXT COLLATE utf8mb4_general_ci DEFAULT NULL,
        is_archived VARCHAR(255) DEFAULT NULL,
        is_updated VARCHAR(255) DEFAULT NULL,
        time_stamp VARCHAR(255) DEFAULT NULL,
        created_time_stamp VARCHAR(255) DEFAULT NULL,
        last_updated_time_stamp VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL
      );
    `);
    console.log("Monitor table created successfully");
  } catch (error) {
    console.error("Error creating Monitor table:", error);
  }
}
