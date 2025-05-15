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
    const id = event.pathParameters.id;
    const requestBody = JSON.parse(event.body);
    
    // Find the product index
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) {
      return formatError(404, `Product with ID ${id} not found`);
    }
    
    // Update the product
    products[index] = { ...products[index], ...requestBody };
    const updatedProduct = products[index];
    
    return formatSuccess(200, updatedProduct);
  } catch (error) {
    return formatError(500, 'Server Error');
  }
}; 