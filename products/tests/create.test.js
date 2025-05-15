'use strict';

const { handler } = require('../create');

// Mocking the utils functions
jest.mock('../utils', () => ({
  formatSuccess: jest.fn((statusCode, data) => ({
    statusCode,
    body: JSON.stringify({ success: true, data })
  })),
  formatError: jest.fn((statusCode, error) => ({
    statusCode,
    body: JSON.stringify({ success: false, error })
  }))
}));

describe('Create Handler', () => {
  it('should create a new product with valid data', async () => {
    const newProduct = {
      name: 'New Test Product',
      price: 49.99,
      description: 'A test product created for testing'
    };
    
    const event = {
      body: JSON.stringify(newProduct)
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(201);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('name', newProduct.name);
    expect(body.data).toHaveProperty('price', newProduct.price);
    expect(body.data).toHaveProperty('description', newProduct.description);
  });
  
  it('should return 400 when name is missing', async () => {
    const invalidProduct = {
      price: 29.99
    };
    
    const event = {
      body: JSON.stringify(invalidProduct)
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(400);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error).toContain('name and price');
  });
  
  it('should return 400 when price is missing', async () => {
    const invalidProduct = {
      name: 'Invalid Product'
    };
    
    const event = {
      body: JSON.stringify(invalidProduct)
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(400);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error).toContain('name and price');
  });
  
  it('should handle error when body is malformed', async () => {
    const event = {
      body: 'not-json'
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(500);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
  });
}); 