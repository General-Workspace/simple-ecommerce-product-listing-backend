# Simple Ecommerce API

This is a simple Ecommerce API that allows you to create, read, update and delete products and orders in addition to creating and logging in users.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Typescript
- Cloudinary
- Multer

## Installation

> Clone the repository

```bash
git clone git@github.com:General-Workspace/simple-ecommerce-product-listing-frontend.git
```

> Install dependencies

```bash
yarn install # or npm install
```

> Start the development server

```bash
yarn dev # or npm run dev
```

> Build the project

```bash
yarn build # or npm run build
```

> Start the production server

```bash
yarn start # or npm start
```

## API Endpoints (Users)

- POST /api/v1/auth/signup
- POST /api/v1/auth/login

## API Endpoints (Products)

- GET /api/v1/products
- POST /api/v1/products
- GET /api/v1/products/:id
- PUT /api/v1/products/:id
- DELETE /api/v1/products/:id

## Usage

- Create a user by making a POST request to /api/v1/auth/signup

### Request

```json
{
  "username": "john_doe",
  "email": "test@test.com",
  "password": "password"
}
```

- Login a user by making a POST request to /api/v1/auth/login

### Request

```json
{
  "email": "test@test.com",
  "password": "password"
}
```

- Create a product by making a POST request to /api/v1/products

### Request

```json
{
  "name": "Product 1",
  "description": "This is a product",
  "price": 1000
}
```
