# E-commerce Backend API

A comprehensive e-commerce backend API built with NestJS, TypeScript, PostgreSQL, and Prisma. Features include user authentication, product management, shopping cart, order processing, and checkout with mock payment.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Secure password hashing with bcrypt

- **Product Management**
  - CRUD operations (Admin only for CUD, Public for Read)
  - Cursor-based pagination
  - Advanced filtering (category, search, price range)

- **Shopping Cart**
  - Add/update/remove items
  - Stock validation
  - Real-time cart total calculation

- **Order Processing**
  - Transaction-based order creation
  - Automatic stock deduction
  - Order history and details

- **Checkout & Payment**
  - Mock payment gateway integration
  - Order status tracking
  - Payment status management

- **Security & Reliability**
  - Rate limiting (100 requests/minute)
  - Input validation with class-validator
  - Global error handling
  - Helmet security headers
  - Password strength requirements

- **Documentation**
  - Interactive Swagger/OpenAPI documentation
  - Comprehensive API examples

## Prerequisites

- Node.js (v20 or higher)
- PostgreSQL (v12 or higher) - installed and running locally
- npm or yarn

## Installation

### 1. Clone and Install Dependencies

```bash
cd backend-assessment
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

The default `.env` file is pre-configured for local development. Modify if needed:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public"
JWT_SECRET="dev-secret-key-change-in-production"
JWT_EXPIRATION="7d"
NODE_ENV="development"
PORT=3000
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

### 3. Setup PostgreSQL Database

**On macOS (using Homebrew):**

```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database and user
psql postgres
```

Then in psql:

```sql
CREATE USER postgres WITH PASSWORD 'postgres';
ALTER USER postgres CREATEDB;
CREATE DATABASE ecommerce OWNER postgres;
\q
```

**On Linux (Ubuntu/Debian):**

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo service postgresql start

# Create database and user
sudo -u postgres psql
```

Then in psql:

```sql
CREATE USER postgres WITH PASSWORD 'postgres';
ALTER USER postgres CREATEDB;
CREATE DATABASE ecommerce OWNER postgres;
\q
```

**On Windows:**

- Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)
- Run installer and set password for postgres user
- Create database using pgAdmin or command line

### 4. Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Seed the database with sample data:

```bash
npx prisma db seed
```

**Default Users Created:**

- **Admin**: email: `admin@example.com`, password: `Admin123!`
- **User**: email: `user@example.com`, password: `User123!`

### 5. Start the Application

Development mode with hot reload:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

Access the interactive Swagger documentation at:

**http://localhost:3000/api/docs**

## 🔑 API Endpoints

### Authentication

| Method | Endpoint         | Description             | Auth Required |
| ------ | ---------------- | ----------------------- | ------------- |
| POST   | `/auth/register` | Register new user       | No            |
| POST   | `/auth/login`    | Login and get JWT token | No            |

### Products

| Method | Endpoint        | Description                        | Auth Required | Role  |
| ------ | --------------- | ---------------------------------- | ------------- | ----- |
| GET    | `/products`     | Get products (paginated, filtered) | No            | -     |
| GET    | `/products/:id` | Get single product                 | No            | -     |
| POST   | `/products`     | Create product                     | Yes           | Admin |
| PATCH  | `/products/:id` | Update product                     | Yes           | Admin |
| DELETE | `/products/:id` | Delete product                     | Yes           | Admin |

### Cart

| Method | Endpoint          | Description           | Auth Required |
| ------ | ----------------- | --------------------- | ------------- |
| GET    | `/cart`           | Get user's cart       | Yes           |
| POST   | `/cart/items`     | Add item to cart      | Yes           |
| PATCH  | `/cart/items/:id` | Update item quantity  | Yes           |
| DELETE | `/cart/items/:id` | Remove item from cart | Yes           |

### Orders

| Method | Endpoint      | Description            | Auth Required |
| ------ | ------------- | ---------------------- | ------------- |
| POST   | `/orders`     | Create order from cart | Yes           |
| GET    | `/orders`     | Get order history      | Yes           |
| GET    | `/orders/:id` | Get order details      | Yes           |

### Checkout

| Method | Endpoint                      | Description            | Auth Required |
| ------ | ----------------------------- | ---------------------- | ------------- |
| POST   | `/checkout/payment`           | Process payment (mock) | Yes           |
| POST   | `/checkout/complete/:orderId` | Complete order         | Yes           |

## 🧪 Testing the API

### Example: Complete User Flow

1. **Register a new user:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

2. **Login to get JWT token:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

3. **Browse products (public):**

```bash
curl http://localhost:3000/products?limit=10&category=Electronics
```

4. **Add item to cart:**

```bash
curl -X POST http://localhost:3000/cart/items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 2
  }'
```

5. **View cart:**

```bash
curl http://localhost:3000/cart \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

6. **Create order:**

```bash
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

7. **Process payment (mock):**

```bash
curl -X POST http://localhost:3000/checkout/payment \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_ID",
    "cardNumber": "4242424242424242",
    "expiryDate": "12/25",
    "cvv": "123"
  }'
```

**Mock Payment Logic:**

- Cards ending in `0000` will fail
- All other 16-digit cards will succeed

## 🏗️ Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data transfer objects
│   ├── strategies/      # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── products/            # Products module
├── cart/                # Shopping cart module
├── orders/              # Orders module
├── checkout/            # Checkout & payment module
├── database/            # Database configuration
│   ├── prisma.service.ts
│   └── database.module.ts
├── common/              # Shared utilities
│   ├── decorators/      # Custom decorators
│   ├── guards/          # Auth & role guards
│   ├── filters/         # Exception filters
│   └── interceptors/    # Logging interceptors
├── config/              # Configuration
├── app.module.ts        # Root module
└── main.ts              # Application entry point
```

## 🗄️ Database Schema

- **Users**: User accounts with roles (ADMIN/USER)
- **Products**: Product catalog with inventory
- **Carts**: User shopping carts
- **CartItems**: Items in shopping carts
- **Orders**: Purchase orders
- **OrderItems**: Line items in orders

View schema: `prisma/schema.prisma`

## 🔧 Development Commands

```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Linting
npm run lint

# Format code
npm run format

# Database commands
npx prisma migrate dev      # Create and apply migration
npx prisma migrate deploy   # Apply migrations (production)
npx prisma studio          # Open Prisma Studio (database GUI)
npx prisma db seed         # Seed database
npx prisma generate        # Generate Prisma client
```

## �️ PostgreSQL Commands

```bash
# Connect to the database
psql -U postgres -d ecommerce

# View all databases
\l

# Connect to specific database
\c ecommerce

# List tables
\dt

# Quit psql
\q

# Backup database
pg_dump -U postgres ecommerce > backup.sql

# Restore database
psql -U postgres ecommerce < backup.sql
```

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (10 rounds)
- Role-based access control (RBAC)
- Rate limiting (100 requests per minute)
- Helmet security headers
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- CORS enabled

## 📦 Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript 5
- **Database**: PostgreSQL 15
- **ORM**: Prisma 7

- **Authentication**: JWT (Passport)
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, bcrypt, throttler

## API Features Checklist

[] User registration and login (JWT)  
[] Role-based access control (Admin/User)  
[] Product CRUD with permissions  
[] Cursor-based pagination  
[] Filtering and search  
[] Shopping cart operations  
[] Order creation from cart  
[] Transaction-based stock management  
[] Mock payment processing  
[] Order status tracking  
[] Rate limiting  
[] Input validation  
[] Password hashing  
[] Error handling  
[] Swagger documentation

## License

This project is for assessment purposes.

## 👥 Default Test Accounts

**Admin Account:**

- Email: `admin@example.com`
- Password: `Admin123!`
- Permissions: Full access to create/update/delete products

**User Account:**

- Email: `user@example.com`
- Password: `User123!`
- Permissions: View products, manage cart, create orders

## 🐛 Troubleshooting

**PostgreSQL connection issues:**

```bash
# Check if PostgreSQL is running
# macOS:
brew services list

# Linux:
sudo service postgresql status

# Verify connection string in .env
# Should be: DATABASE_URL="postgresql://postgres:password@localhost:5432/ecommerce?schema=public"
```

**Database not found:**

```bash
# Create missing database
psql -U postgres -c "CREATE DATABASE ecommerce;"
```

**Permission denied:**

```bash
# Reset PostgreSQL user password
psql -U postgres
ALTER USER postgres PASSWORD 'postgres';
\q
```

**Prisma client issues:**

```bash
# Regenerate Prisma client
npx prisma generate
```

## 📧 Support

For questions or issues, please refer to the API documentation at `/api/docs` when the server is running.
