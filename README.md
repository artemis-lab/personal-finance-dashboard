# Personal Finance Dashboard

A full-stack application for importing transaction history, categorizing expenses, and generating financial reports.

> **Note:** Transaction importing and expense categorization are not yet implemented. For demo purposes, the application uses seeded data.

For architecture and system design details, see the [presentation](https://github.com/artemis-lab/technical-design/blob/master/personal-finance-dashboard.pdf).

## Project Structure

```
personal-finance-dashboard/
├── backend/     # Express API service (Node.js, TypeScript)
└── frontend/    # React SPA (React 19, TypeScript, Vite)
```

## Quick Start

### Backend

```bash
cd backend
npm install
npm run dev
```

API available at `http://localhost:3000`. See [backend/README.md](backend/README.md) for full documentation.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Application available at `http://localhost:5173`. See [frontend/README.md](frontend/README.md) for full documentation.

## Tech Stack

### Backend

- Node.js + Express
- TypeScript
- Zod validation
- Docker support

### Frontend

- React 19
- TypeScript
- Vite
- Mantine UI
- Tailwind CSS 4
- TanStack Query

## License

MIT
