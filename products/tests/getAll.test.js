'use strict';

const { handler } = require('../getAll');

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

describe('GetAll Handler', () => {
  it('should return all products', async () => {
    const response = await handler({});
    
    expect(response.statusCode).toBe(200);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    
    // Products array should not be empty
    expect(body.data.length).toBeGreaterThan(0);
    
    // Check that each product has the required fields
    body.data.forEach(product => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('description');
    });
  });
}); 