# E-Commerce Backend API

Backend API for e-commerce product listing built with Node.js, Express, TypeScript, and Prisma.

## Tech Stack
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite (dev) / PostgreSQL (production)

## Setup
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed  # Adds sample products
npm run dev  # Runs on port 3001
```

## API Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products?category=Apparel` - Filter by category
- `POST /products` - Create new product

## Environment Variables
```
DATABASE_URL="file:./dev.db"  # SQLite for development
PORT=3001
```

## Frontend Repository

The frontend for this API is at: https://github.com/Stevo1935/ecommerce-frontend