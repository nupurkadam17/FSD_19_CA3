/**
 * CLOSETÉ - Program 1 Automated Verification Suite
 * Verifies HTTP GET, POST, validation, error handling, and static serving.
 */

const http = require('http');

process.env.PORT = '5050';
const PORT = 5050;

// Helper to make HTTP requests
function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: '127.0.0.1',
      port: PORT,
      ...options
    };
    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          json: () => {
            try { return JSON.parse(data); } catch { return null; }
          }
        });
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING PROGRAM 1 AUTOMATED VERIFICATION ---');

  // Test 1: GET /api/products
  console.log('\n[TEST 1] Testing HTTP GET /api/products:');
  const getRes = await request({
    path: '/api/products',
    method: 'GET'
  });
  console.log(`Status Code: ${getRes.statusCode} (Expected: 200)`);
  const getData = getRes.json();
  console.log(`Status in JSON: ${getData?.status}`);
  console.log(`Products Count: ${getData?.count}`);
  console.log(`First product: ${getData?.data[0]?.name} - ₹${getData?.data[0]?.price}`);
  if (getRes.statusCode === 200 && Array.isArray(getData?.data) && getData?.data.length > 0) {
    console.log('✓ TEST 1 PASSED: HTTP GET operational with JSON response.');
  } else {
    throw new Error('TEST 1 FAILED');
  }

  // Test 2: POST /api/products with valid data
  console.log('\n[TEST 2] Testing HTTP POST /api/products (Creation):');
  const validPayload = {
    name: 'Bespoke Silk Tuxedo Blazer',
    category: 'Outerwear',
    price: 12990,
    stock: 5,
    description: 'Handcrafted tuxedo blazer with satin lapels and structured shoulders.',
    sizes: ['S', 'M', 'L'],
    colors: ['Noir']
  };
  const postRes = await request({
    path: '/api/products',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(validPayload))
    }
  }, validPayload);

  console.log(`Status Code: ${postRes.statusCode} (Expected: 201)`);
  const postData = postRes.json();
  console.log(`Status in JSON: ${postData?.status}`);
  console.log(`Created Item ID: ${postData?.data?.id}`);
  console.log(`Created Item Name: ${postData?.data?.name}`);
  if (postRes.statusCode === 201 && postData?.data?.id) {
    console.log('✓ TEST 2 PASSED: HTTP POST operational with 201 Created.');
  } else {
    throw new Error('TEST 2 FAILED');
  }

  // Test 3: POST /api/products with invalid data (Validation & Error handling)
  console.log('\n[TEST 3] Testing HTTP POST /api/products with Missing Fields (Validation):');
  const invalidPayload = { name: 'Faulty Piece' }; // Missing category & price
  const badPostRes = await request({
    path: '/api/products',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(invalidPayload))
    }
  }, invalidPayload);

  console.log(`Status Code: ${badPostRes.statusCode} (Expected: 400)`);
  const badPostData = badPostRes.json();
  console.log(`Error Message: ${badPostData?.message}`);
  if (badPostRes.statusCode === 400 && badPostData?.status === 'error') {
    console.log('✓ TEST 3 PASSED: Input validation properly rejected malformed payload.');
  } else {
    throw new Error('TEST 3 FAILED');
  }

  // Test 4: Static Asset Delivery
  console.log('\n[TEST 4] Testing Static Asset Delivery (GET /):');
  const staticRes = await request({
    path: '/',
    method: 'GET'
  });
  console.log(`Status Code: ${staticRes.statusCode} (Expected: 200)`);
  console.log(`Content-Type: ${staticRes.headers['content-type']}`);
  const hasBrand = staticRes.body.includes('CLOSETÉ');
  console.log(`Contains brand name CLOSETÉ: ${hasBrand}`);
  if (staticRes.statusCode === 200 && hasBrand) {
    console.log('✓ TEST 4 PASSED: Static HTML delivery operational.');
  } else {
    throw new Error('TEST 4 FAILED');
  }

  console.log('\n=============================================');
  console.log('  ALL PROGRAM 1 AUTOMATED TESTS PASSED (4/4)');
  console.log('=============================================');
}

// Start server in-process and run tests
require('./server.js');
setTimeout(() => {
  runTests().then(() => {
    process.exit(0);
  }).catch((err) => {
    console.error('Test execution failed:', err);
    process.exit(1);
  });
}, 800);
