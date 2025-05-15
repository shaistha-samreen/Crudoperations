'use strict';

const { handler } = require('../update');

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

describe('Update Handler', () => {
  it('should update a product with valid ID and data', async () => {
    const updates = {
      price: 899.99,
      description: 'Updated description'
    };
    
    const event = {
      pathParameters: {
        id: '1'
      },
      body: JSON.stringify(updates)
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(200);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty('id', '1');
    expect(body.data).toHaveProperty('price', updates.price);
    expect(body.data).toHaveProperty('description', updates.description);
  });
  
  it('should return 404 when product ID does not exist', async () => {
    const updates = {
      price: 99.99
    };
    
    const event = {
      pathParameters: {
        id: 'non-existent-id'
      },
      body: JSON.stringify(updates)
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(404);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error).toContain('not found');
  });
  
  it('should handle error when pathParameters is missing', async () => {
    const event = {
      body: JSON.stringify({ price: 50 })
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(500);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
  });
  
  it('should handle error when body is malformed', async () => {
    const event = {
      pathParameters: {
        id: '1'
      },
      body: 'not-json'
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(500);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
  });
}); 