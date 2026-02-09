import { test as base } from '@playwright/test';
import { Client } from 'pg';
import 'dotenv/config';

// Define the shape of our credential object
type AppCredentials = {
  user: string;
  pass: string;
};

// Extend the base test to include 'dbAuth'
export const test = base.extend<{ dbAuth: AppCredentials }>({
  dbAuth: async ({}, use) => {
    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'your_db_name',
      port: 5432,
    });

    await client.connect();
    
    // Query both columns for the specific service
    const res = await client.query(
      "SELECT username, password FROM credentials WHERE service_name = $1", 
      ['AutoQL_Production']
    );
    
    const credentials = {
      user: res.rows[0].username,
      pass: res.rows[0].password
    };

    await client.end();

    // Pass the object to the test
    await use(credentials);
  },
});

export { expect } from '@playwright/test';