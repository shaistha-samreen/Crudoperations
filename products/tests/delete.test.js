'use strict';

const { handler } = require('../delete');

// Mocking the utils functions
jest.mock('../utils', () => ({
  formatSuccess: jest.fn((statusCode, data, message) => ({
    statusCode,
    body: JSON.stringify({ success: true, data, message })
  })),
  formatError: jest.fn((statusCode, error) => ({
    statusCode,
    body: JSON.stringify({ success: false, error })
  }))
}));

describe('Delete Handler', () => {
  it('should delete a product with valid ID', async () => {
    const event = {
      pathParameters: {
        id: '1'
      }
    };
    
    const response = await handler(event);
    
    expect(response.statusCode).toBe(200);
    
    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.message).toContain('deleted successfully');
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
  
  // This is to test the behavior for multiple delete operations
  it('should handle attempt to delete the same product twice', async () => {
    const event = {
      pathParameters: {
        id: '2'
      }
    };
    
    // First delete should succeed
    const firstResponse = await handler(event);
    expect(firstResponse.statusCode).toBe(200);
    
    // Second delete should fail with 404
    const secondResponse = await handler(event);
    expect(secondResponse.statusCode).toBe(404);
    
    const body = JSON.parse(secondResponse.body);
    expect(body.success).toBe(false);
    expect(body.error).toContain('not found');
  });
}); 