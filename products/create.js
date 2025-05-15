'use strict';

const { formatSuccess, formatError } = require('./utils');

// Hardcoded products data
const products = [
  {
    id: '1',
    name: 'Laptop',
    price: 999.99,
    description: 'High-performance laptop with 16GB RAM'
  },
  {
    id: '2',
    name: 'Smartphone',
    price: 699.99,
    description: 'Latest smartphone with 5G capability'
  },
  {
    id: '3',
    name: 'Headphones',
    price: 149.99,
    description: 'Noise-cancelling wireless headphones'
  }
];

module.exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    
    // Basic validation
    if (!requestBody.name || !requestBody.price) {
      return formatError(400, 'Please provide name and price');
    }
    
    // Create a new product
    const newProduct = {
      id: Date.now().toString(),
      ...requestBody
    };
    products.push(newProduct);
    
    return formatSuccess(201, newProduct);
  } catch (error) {
    return formatError(500, 'Server Error');
  }
}; 