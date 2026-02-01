# E-Commerce Payment System Backend

Backend API developed with NestJS for an e-commerce payment system. Implements hexagonal architecture (ports and adapters pattern) with clean separation of concerns.

## 🏗️ Architecture

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Architecture Pattern**: Hexagonal Architecture / Ports & Adapters
- **Design Pattern**: Railway Oriented Programming (ROP)
- **External API Integration**: Payment Provider Sandbox

## 📊 Data Model

### Database Schema

**Product**
- id (UUID, PK)
- name (String)
- description (String)
- amount (Integer - amount in cents)
- currency (Enum: COP, USD)
- image (String - URL)
- stock (Integer)
- createdAt, updatedAt (DateTime)

**Customer**
- id (UUID, PK)
- email (String, Unique)
- full_name (String)
- createdAt (DateTime)

**Delivery**
- id (UUID, PK)
- customerId (UUID, FK → Customer)
- address (String)
- city (String)
- createdAt, updatedAt (DateTime)

**Transaction**
- id (UUID, PK)
- status (Enum: PENDING, APPROVED, DECLINED, ERROR)
- customerId (UUID, FK → Customer)
- deliveryId (UUID, FK → Delivery, nullable)
- externalTransactionId (String)
- subtotal (Integer)
- baseFee (Integer)
- deliveryFee (Integer)
- totalAmount (Integer)
- currency (Enum: COP, USD)
- createdAt, updatedAt (DateTime)

**TransactionProduct**
- id (UUID, PK)
- transactionId (UUID, FK → Transaction)
- productId (UUID, FK → Product)
- quantity (Integer)
- unitPrice (Integer)
- totalAmount (Integer)
- createdAt, updatedAt (DateTime)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start PostgreSQL with Docker
docker compose up -d

# Run Prisma migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Build the application
npm run build
```

### Configuration

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgresprueba"

# Payment Provider (Sandbox)
PAYMENT_PROVIDER_BASE_URL="https://api-sandbox.co.uat.wompi.dev/v1"
PAYMENT_PROVIDER_PUBLIC_KEY="pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7"
PAYMENT_PROVIDER_PRIVATE_KEY="prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg"
PAYMENT_PROVIDER_EVENTS_KEY="stagtest_events_2PDUmhMywUkvb1LvxYnayFbmofT7w39N"
PAYMENT_PROVIDER_INTEGRITY_KEY="stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp"
```

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Postman Collection

Import the `postman_collection.json` file into Postman to test all endpoints.

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Products

**GET /products**
- Get all products with stock information
- Response: `{ statusCode, message, data: Product[], timestamp }`

**GET /products/:id**
- Get a specific product by ID
- Response: `{ statusCode, message, data: Product, timestamp }`

**PATCH /products/:id/update-stock**
- Update product stock
- Body: `{ stock: number }`
- Response: `{ statusCode, message, data: Product, timestamp }`

#### Customers

**POST /customers**
- Create or get existing customer
- Body: `{ email: string, full_name: string }`
- Response: `{ statusCode, message, data: Customer, timestamp }`

#### Deliveries

**POST /deliveries**
- Create delivery information
- Body: `{ customerId: string, address: string, city: string }`
- Response: `{ statusCode, message, data: Delivery, timestamp }`

#### Transactions

**POST /transactions**
- Create a new transaction with PENDING status
- Body:
```json
{
  "customerId": "uuid",
  "deliveryId": "uuid",
  "products": [
    { "productId": "uuid", "quantity": 2 }
  ],
  "baseFee": 5000,
  "deliveryFee": 10000,
  "currency": "COP"
}
```
- Response: `{ statusCode, message, data: Transaction, timestamp }`

**PATCH /transactions/:id/status**
- Update transaction status (APPROVED, DECLINED, ERROR)
- Body: `{ status: string, externalTransactionId: string }`
- Response: `{ statusCode, message, data: Transaction, timestamp }`

#### Payment Provider

**POST /payment-provider/tokens/cards**
- Create a card token for payment
- Body:
```json
{
  "number": "4242424242424242",
  "exp_month": "12",
  "exp_year": "2025",
  "cvc": "123",
  "card_holder": "John Doe"
}
```
- Response: `{ statusCode, message, data: CardToken, timestamp }`

**POST /payment-provider/transactions**
- Process payment transaction
- Body:
```json
{
  "acceptance_token": "string",
  "accept_personal_auth": "true",
  "amount_in_cents": 3269900,
  "currency": "COP",
  "customer_email": "customer@example.com",
  "reference": "transaction-ref-123",
  "signature": "signature-hash",
  "payment_method": {
    "type": "CARD",
    "token": "card-token",
    "installments": 1
  }
}
```
- Response: `{ statusCode, message, data: PaymentTransaction, timestamp }`

## 🔄 Payment Flow

1. **Show Products**: GET `/products` - Display available products with prices and stock
2. **Create Customer**: POST `/customers` - Create or get customer information
3. **Create Delivery**: POST `/deliveries` - Create delivery address
4. **Create Card Token**: POST `/payment-provider/tokens/cards` - Tokenize credit card
5. **Create Transaction**: POST `/transactions` - Create transaction with PENDING status
6. **Process Payment**: POST `/payment-provider/transactions` - Process payment with external provider
7. **Update Transaction**: PATCH `/transactions/:id/status` - Update transaction with result (APPROVED/DECLINED/ERROR)
8. **Update Stock**: PATCH `/products/:id/update-stock` - Update product stock after successful payment

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Test Coverage

Run `npm run test:cov` to generate coverage report. Target: >80% coverage.

## 📁 Project Structure

```
src/
├── app.module.ts
├── main.ts
├── common/
│   ├── filters/
│   ├── interceptors/
│   └── utils/
├── customers/
│   ├── application/
│   │   ├── input/
│   │   ├── output/
│   │   ├── ports/
│   │   ├── services/
│   │   └── use-cases/
│   ├── domain/
│   │   ├── entities/
│   │   └── value-objects/
│   ├── infrastructure/
│   │   ├── adapters/
│   │   ├── controllers/
│   │   └── dto/
│   └── customer.module.ts
├── deliveries/
│   └── [similar structure]
├── products/
│   └── [similar structure]
├── transactions/
│   └── [similar structure]
├── payment-provider/
│   └── [similar structure]
└── prisma/
    ├── prisma.module.ts
    └── prisma.service.ts
```

## 🔐 Security

- Environment variables for sensitive data
- Input validation with class-validator
- Error handling and sanitization
- No hardcoded credentials
- Security scanning with CodeQL

## 🚢 Deployment

The application can be deployed to:
- AWS Lambda (Serverless)
- AWS ECS/EKS (Containerized)
- AWS EC2
- Any cloud provider supporting Node.js applications

## 📝 License

UNLICENSED

---

**Important Notes:**
- This is a test environment using sandbox payment provider
- Credit card data must follow standard format but can be fake for testing
- No real money transactions occur
- Database is seeded with dummy products automatically
