export function generateUniqueSlug(name, existingSlugs) {
  let slug = name.toLowerCase().replace(/\s+/g, "-");

  let counter = 1;
  let tempSlug = slug;
  while (existingSlugs.includes(tempSlug)) {
    tempSlug = `${slug}-${counter}`;
    counter++;
  }

  return tempSlug;
}

export async function getDatabaseName(userId, db) {
  try {
    const [userRows] = await db.query(
      "SELECT * FROM feedback247.users WHERE id = ?",
      [userId]
    );
    if (userRows.length === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
    const user = userRows[0];
    return user.db_name;
  } catch (error) {
    console.error("Error fetching database name:", error);
    throw error; // Re-throw the error after logging it
  }
}
export async function getNewRecordsKey(db, dbName) {
  try {
    console.log(dbName);
    const [rows] = await db.query(
      `SELECT key_id FROM ${dbName}.servey_records ORDER BY key_id DESC LIMIT 1`
    );

    if (rows.length === 0) {
      return "11001"; // Start with '11001' if no records are found
    }

    const latestMonitorKey = parseInt(rows[0].key_id, 10);
    const newMonitorKey = (latestMonitorKey + 1).toString();

    return newMonitorKey;
  } catch (error) {
    console.error("Error fetching latest key:", error);
    throw error;
  }
}

export async function getNewMonitorKey(db, dbName) {
  try {
    console.log(dbName);
    const [rows] = await db.query(
      `SELECT monitor_key FROM ${dbName}.monitors ORDER BY monitor_key DESC LIMIT 1`
    );

    if (rows.length === 0) {
      return "11001"; // Start with '11001' if no records are found
    }

    const latestMonitorKey = parseInt(rows[0].monitor_key, 10);
    const newMonitorKey = (latestMonitorKey + 1).toString();

    return newMonitorKey;
  } catch (error) {
    console.error("Error fetching latest monitor_key:", error);
    throw error;
  }
}
export async function getNewUserKey(db, dbName) {
  try {
    console.log(dbName);
    const [rows] = await db.query(
      `SELECT login_key FROM feedback247.users ORDER BY login_key DESC LIMIT 1`
    );

    if (rows.length === 0) {
      return "11001"; // Start with '11001' if no records are found
    }

    const latestMonitorKey = parseInt(rows[0].login_key, 10);
    const newMonitorKey = (latestMonitorKey + 1).toString();

    return newMonitorKey;
  } catch (error) {
    console.error("Error fetching latest login_key:", error);
    throw error;
  }
}
