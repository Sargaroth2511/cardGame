#!/usr/bin/env node

/**
 * CSP Generator Script
 * Generates CSP meta tag from policy file
 * Usage: node generate-csp.js
 */

const fs = require('fs');
const path = require('path');

function generateCSP() {
  try {
    const policyPath = path.join(__dirname, 'csp-policy.txt');
    const policyContent = fs.readFileSync(policyPath, 'utf8');

    // Remove comments and clean up
    const cleanPolicy = policyContent
      .split('\n')
      .filter(line => !line.trim().startsWith('#') && line.trim())
      .map(line => line.replace(/\s*\\\s*$/, '').trim())
      .filter(line => line.length > 0)
      .join('; ');

    const cspMetaTag = `<meta http-equiv="Content-Security-Policy" content="${cleanPolicy}">`;

    console.log('Generated CSP Meta Tag:');
    console.log(cspMetaTag);

    return cspMetaTag;
  } catch (error) {
    console.error('Error generating CSP:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  generateCSP();
}

module.exports = { generateCSP };
