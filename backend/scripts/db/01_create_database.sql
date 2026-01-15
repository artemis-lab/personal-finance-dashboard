-- Create the personal_finance database
-- Run this script as a PostgreSQL superuser (e.g., postgres)
-- Usage: psql -U postgres -f 01_create_database.sql

-- Terminate existing connections to the database (if any)
SELECT
  pg_terminate_backend(pg_stat_activity.pid)
FROM
  pg_stat_activity
WHERE
  pg_stat_activity.datname = 'personal_finance'
  AND pid <> pg_backend_pid();

-- Drop database if exists (comment out in production)
DROP DATABASE IF EXISTS personal_finance;

-- Create database
CREATE DATABASE personal_finance;

-- Connect to the new database
\c personal_finance

COMMENT ON DATABASE personal_finance IS 'Personal Finance Dashboard - Transaction management and reporting';
