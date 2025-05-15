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
    
    // Find the product index
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) {
      return formatError(404, `Product with ID ${id} not found`);
    }
    
    // Delete the product
    products.splice(index, 1);
    
    return formatSuccess(200, null, `Product with ID ${id} deleted successfully`);
  } catch (error) {
    return formatError(500, 'Server Error');
  }
}; 