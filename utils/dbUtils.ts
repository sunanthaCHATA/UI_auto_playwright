import { Client } from 'pg';

export async function getAppCredentials(serviceName: string) {
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    await client.connect();

    try {
        // 1. Updated query to fetch ALL 4 values
        const query = "SELECT username, password, app_url, application_id FROM test_automation_login_page WHERE mode = $1 LIMIT 1";
        const res = await client.query(query, [serviceName]);

        if (res.rows.length === 0) throw new Error(`Service ${serviceName} not found!`);

        // 2. Map all DB columns to a clear object
        return {
            appUser: res.rows[0].username,
            appPass: res.rows[0].password,
            appUrl: res.rows[0].app_url,
            appId: res.rows[0].application_id,
        };
    } finally {
        await client.end();
    }
}



/*


export async function getAppCredentials(serviceName: string) {
    // 1. Setup connection using .env values
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    await client.connect();

    try {
        // 2. Fetch App Username and Password from the table
        const query = "SELECT username, password FROM test_automation_login_page WHERE mode = $1 LIMIT 1";
        const res = await client.query(query, [service]);

        if (res.rows.length === 0) throw new Error(`Service ${serviceName} not found!`);

        return {
            appUser: res.rows[0].username,
            appPass: res.rows[0].password
        };
    } finally {
        await client.end();
    }
}
    */