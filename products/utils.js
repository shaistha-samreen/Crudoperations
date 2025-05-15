'use strict';

/**
 * Format a successful response
 * @param {number} statusCode - HTTP status code
 * @param {object|array} data - Response data
 * @param {string} message - Optional success message
 * @returns {object} Formatted API response
 */
const formatSuccess = (statusCode, data, message = null) => {
  const response = {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      success: true,
      ...(data && { data }),
      ...(message && { message })
    })
  };
  
  if (Array.isArray(data)) {
    response.body = JSON.stringify({
      success: true,
      count: data.length,
      data,
      ...(message && { message })
    });
  }
  
  return response;
};

/**
 * Format an error response
 * @param {number} statusCode - HTTP status code
 * @param {string} errorMessage - Error message
 * @returns {object} Formatted API error response
 */
const formatError = (statusCode, errorMessage) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      success: false,
      error: errorMessage
    })
  };
};

module.exports = {
  formatSuccess,
  formatError
}; 