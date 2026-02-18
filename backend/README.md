<!-- omit in toc -->
# Finance Service

A Node.js/Express API service that allows import transaction history, categorize expenses, and generate reports. Built with Node.js, TypeScript, Express, and Zod.

> **Note:** Transaction importing and expense categorization are not yet implemented. The service uses seeded data (200 sample transactions).

<!-- omit in toc -->
## Table of Contents

- [Purpose](#purpose)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install Dependencies](#install-dependencies)
  - [Configuration](#configuration)
  - [Database Setup](#database-setup)
  - [Build](#build)
  - [Run](#run)
  - [Run with Docker](#run-with-docker)
  - [Development](#development)
- [API Usage](#api-usage)
  - [Get Transactions](#get-transactions)
- [Examples](#examples)
  - [Success Response (200)](#success-response-200)
  - [Error Response (400)](#error-response-400)
  - [Error Response (429)](#error-response-429)
- [Rate Limiting](#rate-limiting)
- [Health Check](#health-check)
- [Features](#features)
- [Technical Details](#technical-details)
- [License](#license)

## Purpose

A backend service for Personal Finance Dashboard.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm
- PostgreSQL >= 14

### Install Dependencies

```bash
npm install
```

**Note**: `.npmrc` ensures exact versions are installed for deterministic builds.

### Configuration

The service can be configured using environment variables:

```bash
# Required: Environment mode
NODE_ENV=development  # or production

# Optional: CORS origin (default: * allows all origins)
CORS_ORIGIN=https://myapp.com

# Optional: Server port (default: 3000)
PORT=8080

# Database configuration (option 1: connection string)
DATABASE_URL=postgresql://user:password@localhost:5432/personal_finance

# Database configuration (option 2: individual parameters)
DB_HOST=localhost         # default: localhost
DB_PORT=5432              # default: 5432
DB_NAME=personal_finance  # default: personal_finance
DB_USER=postgres          # default: postgres
DB_PASSWORD=postgres      # default: postgres
```

> **Note**: If `DATABASE_URL` is provided, it takes precedence over individual `DB_*` parameters.

### Database Setup

Initialize the PostgreSQL database with the following scripts (run in order):

```bash
# 1. Create the database (run as PostgreSQL superuser)
psql -U postgres -f scripts/db/01_create_database.sql

# 2. Create tables
psql -U postgres -d personal_finance -f scripts/db/02_create_tables.sql

# 3. Seed with sample data (200 transactions)
psql -U postgres -d personal_finance -f scripts/db/03_seed_data.sql
```

Or run all scripts at once:

```bash
psql -U postgres -f scripts/db/01_create_database.sql && \
psql -U postgres -d personal_finance -f scripts/db/02_create_tables.sql && \
psql -U postgres -d personal_finance -f scripts/db/03_seed_data.sql
```

### Build

```bash
npm run build
```

### Run

```bash
# Development with hot reload
npm run dev

# Production (requires build first)
npm start
```

The server runs on `http://localhost:3000` by default (configurable via `PORT` environment variable).

### Run with Docker

Test the production Docker image locally using Docker Compose:

```bash
# Start the service (builds automatically)
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop and remove containers
docker-compose down

# Rebuild and restart
docker-compose up --build
```

Test the service:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/transactions
```

### Development

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## API Usage

### Get Transactions

```bash
GET /api/v1/transactions
```

**Query Parameters:**

| Parameter   | Type   | Default | Description                              |
| ----------- | ------ | ------- | ---------------------------------------- |
| `limit`     | number | 30      | Number of transactions to return (1-100) |
| `offset`    | number | 0       | Number of transactions to skip           |
| `sortBy`    | string | "date"  | Sort field: "date" or "amount"           |
| `sortOrder` | string | "desc"  | Sort order: "asc" or "desc"              |
| `yearMonth` | string | -       | Filter by month in "YYYY-MM" format      |

## Examples

```bash
# Get all transactions (default: 30, sorted by date descending)
curl http://localhost:3000/api/v1/transactions

# Get transactions with pagination
curl "http://localhost:3000/api/v1/transactions?limit=10&offset=20"

# Get transactions for a specific month
curl "http://localhost:3000/api/v1/transactions?yearMonth=2026-01"

# Get transactions sorted by amount
curl "http://localhost:3000/api/v1/transactions?sortBy=amount&sortOrder=desc"
```

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "amount": 150.5,
        "date": "2026-01-15",
        "description": "Grocery Store",
        "merchant": "Whole Foods",
        "transactionType": "debit",
        "category": "Groceries",
        "categorySource": "ai"
      }
    ],
    "hasMore": true,
    "total": 142
  }
}
```

### Error Response (400)

```json
{
  "success": false,
  "error": "ValidationError",
  "message": "yearMonth must be in format YYYY-MM",
  "details": [
    {
      "field": "yearMonth",
      "message": "yearMonth must be in format YYYY-MM"
    }
  ]
}
```

### Error Response (429)

```json
{
  "success": false,
  "error": "TooManyRequestsError",
  "message": "Too many requests, please try again later"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

**Global Rate Limit:**

- **Limit**: 100 requests per IP address
- **Window**: 15 minutes (900 seconds)

**Transactions Endpoint Rate Limit:**

- **Limit**: 100 requests per IP address
- **Window**: 1 minute (60 seconds)

**Headers**: Standard `RateLimit-*` headers are returned with every response

**Response**: Returns 429 status code when limit is exceeded

**Example:**

```bash
# Check rate limit status in response headers
curl -I http://localhost:3000/api/v1/transactions

# Response headers include:
# RateLimit-Limit: 100
# RateLimit-Remaining: 99
# RateLimit-Reset: 60
```

## Health Check

```bash
curl http://localhost:3000/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

## Features

- ✅ **Type-safe**: Written in TypeScript with strict mode enabled
- ✅ **Validated**: Zod schema validation for all inputs
- ✅ **Observable**: Structured logging with trace IDs for request tracking
- ✅ **Secure**: Security headers (Helmet), rate limiting, 50MB body size limit, configurable CORS
- ✅ **Production-ready**: Graceful shutdown handling (SIGTERM/SIGINT)
- ✅ **Centralized error handling**: Consistent error responses across all endpoints

## Technical Details

- **Architecture**: Layered architecture (Routes → Controllers → Services → Repositories)
- **Error Handling**: Custom error classes extending ApplicationError with HTTP status codes
- **Dependency Injection**: Constructor-based DI for testability
- **Code Quality**: ESLint + Prettier with automated formatting

## License

MIT
