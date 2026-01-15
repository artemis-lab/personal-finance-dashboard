import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_NAME = process.env.DB_NAME || "personal_finance";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";

const POOL_MAX_CONNECTIONS = 10;
const POOL_IDLE_TIMEOUT_MS = 30000;
const POOL_CONNECTION_TIMEOUT_MS = 2000;

const poolConfig = DATABASE_URL
  ? { connectionString: DATABASE_URL }
  : {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    };

export const pool = new Pool({
  ...poolConfig,
  max: POOL_MAX_CONNECTIONS,
  idleTimeoutMillis: POOL_IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: POOL_CONNECTION_TIMEOUT_MS,
});

export async function closePool(): Promise<void> {
  await pool.end();
}
