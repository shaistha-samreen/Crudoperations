# Serverless Products API

A simple serverless CRUD API for managing products, built with AWS Lambda and Serverless Framework.

## Features

- Get all products
- Get a specific product by ID
- Create a new product
- Update an existing product
- Delete a product

## API Endpoints

| HTTP Method | Endpoint           | Description           |
|-------------|--------------------|----------------------|
| GET         | /products          | Get all products      |
| GET         | /products/{id}     | Get product by ID     |
| POST        | /products          | Create a new product  |
| PUT         | /products/{id}     | Update a product      |
| DELETE      | /products/{id}     | Delete a product      |

## Setup and Deployment

### Prerequisites

- Node.js (14.x or later)
- AWS CLI configured with appropriate credentials
- Serverless Framework (`npm install -g serverless`)

### Deployment

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Deploy to AWS:
   ```
   npm run deploy
   ```

## Usage Examples

### Create a Product

```bash
curl -X POST https://your-api-endpoint.amazonaws.com/dev/products \
  -H "Content-Type: application/json" \
  -d '{"name": "New Product", "price": 99.99, "description": "Product description"}'
```

### Get All Products

```bash
curl https://your-api-endpoint.amazonaws.com/dev/products
```

### Get Product by ID

```bash
curl https://your-api-endpoint.amazonaws.com/dev/products/1
```

### Update a Product

```bash
curl -X PUT https://your-api-endpoint.amazonaws.com/dev/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 89.99}'
```

### Delete a Product

```bash
curl -X DELETE https://your-api-endpoint.amazonaws.com/dev/products/1
```

## Implementation Notes

This API uses hardcoded data for demonstration purposes. In a production environment, you would connect it to a database like AWS DynamoDB. 