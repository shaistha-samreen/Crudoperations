'use strict';

const { formatSuccess, formatError } = require('../utils');

describe('Utils', () => {
  describe('formatSuccess', () => {
    it('should format a successful response with an object', () => {
      const data = { id: '1', name: 'Test Product' };
      const response = formatSuccess(200, data);
      
      expect(response.statusCode).toBe(200);
      expect(response.headers['Content-Type']).toBe('application/json');
      expect(response.headers['Access-Control-Allow-Origin']).toBe('*');
      
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data).toEqual(data);
    });
    
    it('should format a successful response with an array', () => {
      const data = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' }
      ];
      const response = formatSuccess(200, data);
      
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.count).toBe(2);
      expect(body.data).toEqual(data);
    });
    
    it('should include an optional message', () => {
      const data = { id: '1', name: 'Test Product' };
      const message = 'Operation successful';
      const response = formatSuccess(201, data, message);
      
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data).toEqual(data);
      expect(body.message).toBe(message);
    });
    
    it('should work with null data and only a message', () => {
      const message = 'Item deleted successfully';
      const response = formatSuccess(200, null, message);
      
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.message).toBe(message);
      expect(body.data).toBeUndefined();
    });
  });
  
  describe('formatError', () => {
    it('should format an error response', () => {
      const errorMessage = 'Resource not found';
      const response = formatError(404, errorMessage);
      
      expect(response.statusCode).toBe(404);
      expect(response.headers['Content-Type']).toBe('application/json');
      expect(response.headers['Access-Control-Allow-Origin']).toBe('*');
      
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe(errorMessage);
    });
  });
}); 