'use strict';

const { handler } = require('../getById');

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

describe('GetById Handler', () => {
  it('should return a product when valid ID is provided', async () => {
    // Testing with ID 1, which exists in our hardcoded data
    const event = {
      pathParameters: {
        id: '1'
      }
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(200);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty('id', '1');
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('price');
    expect(body.data).toHaveProperty('description');
  });
  
  it('should return 404 when product ID does not exist', async () => {
    const event = {
      pathParameters: {
        id: 'non-existent-id'
      }
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(404);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error).toContain('not found');
  });
  
  it('should handle error when pathParameters is missing', async () => {
    const event = {};
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(500);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
  });
}); 