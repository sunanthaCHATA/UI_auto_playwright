import { Client } from 'pg';

export class DataBaseUtils {
  /**
   * Get test automation credentials from database
   */
  static async getAppCredentials(serviceName: string) {
    console.log(`[DataBaseUtils] Fetching credentials for service: ${serviceName}`);
    const client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    try {
      await client.connect();
      console.log('[DataBaseUtils] Connected to database');

      const query =
        'SELECT username, password, app_url, application_id FROM test_automation_login_page WHERE mode = $1 LIMIT 1';
      const res = await client.query(query, [serviceName]);

      if (res.rows.length === 0) {
        throw new Error(`Service ${serviceName} not found in database!`);
      }

      const credentials = {
        appUser: res.rows[0].username,
        appPass: res.rows[0].password,
        appUrl: res.rows[0].app_url,
        appId: res.rows[0].application_id,
      };

      console.log(`[DataBaseUtils] Credentials retrieved successfully`);
      return credentials;
    } finally {
      await client.end();
      console.log('[DataBaseUtils] Database connection closed');
    }
  }

  /**
   * Execute a custom query against the test database
   */
  static async executeQuery<T>(query: string, values?: any[]): Promise<T[]> {
    console.log(`[DataBaseUtils] Executing query`);
    const client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    try {
      await client.connect();
      const res = await client.query(query, values);
      console.log(`[DataBaseUtils] Query executed successfully, rows: ${res.rows.length}`);
      return res.rows as T[];
    } finally {
      await client.end();
    }
  }

  /**
   * Get test data from database
   */
  static async getTestData(tableName: string): Promise<any[]> {
    console.log(`[DataBaseUtils] Fetching test data from table: ${tableName}`);
    return await this.executeQuery(`SELECT * FROM ${tableName}`);
  }
}
