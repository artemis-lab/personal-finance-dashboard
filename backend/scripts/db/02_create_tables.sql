-- Create tables for personal_finance database
-- Run this script after creating the database
-- Usage: psql -U postgres -d personal_finance -f 02_create_tables.sql

-- Create enum types
CREATE TYPE transaction_type AS ENUM ('credit', 'debit');

CREATE TYPE category_source AS ENUM ('ai', 'user');

-- Create transactions table
CREATE TABLE transactions (
    -- Core fields
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    date DATE NOT NULL,
    description VARCHAR(500) NOT NULL,
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant VARCHAR(255) NOT NULL,
    transaction_type transaction_type NOT NULL,
    -- AI-based categorization
    category VARCHAR(100) NOT NULL,
    category_source category_source NOT NULL DEFAULT 'ai',
    -- Optional metadata fields
    account VARCHAR(100),
    balance DECIMAL(12, 2),
    reference VARCHAR(100),
    transaction_method VARCHAR(50),
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for filtering and sorting
CREATE INDEX idx_transactions_date ON transactions(date DESC);

CREATE INDEX idx_transactions_amount ON transactions(amount DESC);
