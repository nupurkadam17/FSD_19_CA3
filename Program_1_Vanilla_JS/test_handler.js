/**
 * CLOSETÉ - Program 1 In-Memory HTTP Protocol & Server Handler Verification
 * Rigorously executes the actual server request listener using mock HTTP streams,
 * completely immune to OS TCP socket sandbox restrictions.
 */

const { Readable } = require('stream');
const EventEmitter = require('events');
const path = require('path');
const fs = require('fs');

// Import the live server instance
const server = require('./server.js');

function createMockReq(method, url, headers = {}, body = null) {
  let isRead = false;
  const req = new Readable({
    read() {
      if (!isRead) {
        isRead = true;
        if (body) {
          const payload = typeof body === 'string' ? body : JSON.stringify(body);
          this.push(payload);
        }
        this.push(null);
      }
    }
  });

  req.method = method;
  req.url = url;
  req.headers = {
    host: 'localhost:5000',
    ...headers
  };
  req.socket = { destroy: () => {} };
  return req;
}

function createMockRes() {
  const res = new EventEmitter();
  res.statusCode = 200;
  res.headers = {};
  res.data = '';

  res.setHeader = (key, val) => {
    res.headers[key.toLowerCase()] = val;
  };

  res.writeHead = (status, headers = {}) => {
    res.statusCode = status;
    Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
  };

  res.write = (chunk) => {
    if (chunk) res.data += chunk.toString();
  };

  res.end = (chunk) => {
    if (chunk) res.data += chunk.toString();
    res.emit('finish');
  };

  return res;
}

function dispatch(method, url, headers = {}, body = null) {
  return new Promise((resolve) => {
    const req = createMockReq(method, url, headers, body);
    const res = createMockRes();

    res.on('finish', () => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: res.data,
        json: () => {
          try { return JSON.parse(res.data); } catch { return null; }
        }
      });
    });

    server.emit('request', req, res);
  });
}

async function runProtocolTests() {
  console.log('================================================================');
  console.log('  CLOSETÉ - PROGRAM 1 NATIVE HTTP SERVER ENDPOINT VERIFICATION   ');
  console.log('================================================================\n');

  // Test 1: GET /api/products
  console.log('[TEST 1] Dispatching HTTP GET /api/products...');
  const getRes = await dispatch('GET', '/api/products', { accept: 'application/json' });
  console.log(`Status Code: ${getRes.statusCode} (Expected: 200)`);
  const getData = getRes.json();
  console.log(`Response Status: "${getData?.status}"`);
  console.log(`Product Count: ${getData?.count}`);
  console.log(`Sample Product: "${getData?.data[0]?.name}" - ₹${getData?.data[0]?.price}`);
  if (getRes.statusCode === 200 && getData?.status === 'success' && getData?.count >= 12) {
    console.log('✓ TEST 1 PASSED: GET /api/products correctly returned catalog.');
  } else {
    throw new Error('TEST 1 FAILED');
  }

  // Test 2: POST /api/products (Valid Creation)
  console.log('\n[TEST 2] Dispatching HTTP POST /api/products (Valid Product Creation)...');
  const newProductPayload = {
    name: 'Bespoke Mulberry Silk Wrap Gown',
    category: 'Dresses',
    price: 13990,
    stock: 7,
    description: 'Floor-sweeping silk wrap gown with self-tie sash and flowing hem.',
    sizes: ['S', 'M', 'L'],
    colors: ['Noir', 'Oatmeal']
  };

  const postRes = await dispatch('POST', '/api/products', {
    'content-type': 'application/json'
  }, newProductPayload);

  console.log(`Status Code: ${postRes.statusCode} (Expected: 201)`);
  const postData = postRes.json();
  console.log(`Response Status: "${postData?.status}"`);
  console.log(`Generated Product ID: "${postData?.data?.id}"`);
  console.log(`Created Name: "${postData?.data?.name}"`);
  console.log(`Created Price: ₹${postData?.data?.price}`);
  if (postRes.statusCode === 201 && postData?.status === 'success' && postData?.data?.id) {
    console.log('✓ TEST 2 PASSED: HTTP POST returned 201 Created with JSON representation.');
  } else {
    throw new Error('TEST 2 FAILED');
  }

  // Test 3: POST /api/products (Input Validation Error Handling)
  console.log('\n[TEST 3] Dispatching HTTP POST /api/products (Missing Category & Negative Price)...');
  const badPayload = {
    name: 'Invalid Piece',
    price: -500 // Invalid price, missing category
  };

  const badRes = await dispatch('POST', '/api/products', {
    'content-type': 'application/json'
  }, badPayload);

  console.log(`Status Code: ${badRes.statusCode} (Expected: 400)`);
  const badData = badRes.json();
  console.log(`Response Status: "${badData?.status}"`);
  console.log(`Validation Error Message: "${badData?.message}"`);
  if (badRes.statusCode === 400 && badData?.status === 'error') {
    console.log('✓ TEST 3 PASSED: Input validation rejected malformed POST payload.');
  } else {
    throw new Error('TEST 3 FAILED');
  }

  // Test 4: Static Asset Delivery
  console.log('\n[TEST 4] Testing Static Asset Serving (GET /)...');
  const staticRes = await dispatch('GET', '/');
  console.log(`Status Code: ${staticRes.statusCode} (Expected: 200)`);
  console.log(`Content-Type: ${staticRes.headers['content-type']}`);
  const containsTitle = staticRes.body.includes('CLOSETÉ');
  console.log(`Contains Brand Header: ${containsTitle}`);
  if (staticRes.statusCode === 200 && containsTitle) {
    console.log('✓ TEST 4 PASSED: Static HTML served correctly.');
  } else {
    throw new Error('TEST 4 FAILED');
  }

  // Test 5: 404 Route Handling
  console.log('\n[TEST 5] Testing Non-Existent Route (GET /missing-resource)...');
  const notFoundRes = await dispatch('GET', '/missing-resource');
  console.log(`Status Code: ${notFoundRes.statusCode} (Expected: 404)`);
  if (notFoundRes.statusCode === 404) {
    console.log('✓ TEST 5 PASSED: 404 error returned for unknown paths.');
  } else {
    throw new Error('TEST 5 FAILED');
  }

  console.log('\n================================================================');
  console.log('  ALL PROGRAM 1 PROTOCOL TESTS PASSED WITH 100% SUCCESS RATE!    ');
  console.log('================================================================\n');

  // Close server and exit cleanly
  server.close(() => {
    process.exit(0);
  });
}

runProtocolTests().catch(err => {
  console.error('Fatal error during protocol testing:', err);
  process.exit(1);
});
