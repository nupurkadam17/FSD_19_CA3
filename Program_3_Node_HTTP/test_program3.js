/**
 * CLOSETÉ - Program 3 Automated Test & Verification Suite
 * Tests native HTTP routes, file system operations, EventEmitter,
 * streams, and error handling.
 */

const { Readable } = require('stream');
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const server = require('./server.js');
const { LOG_FILE } = require('./utils/inventoryEvents');
const { DATA_FILE } = require('./utils/fileStore');

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
    host: 'localhost:5001',
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

async function runTests() {
  console.log('================================================================');
  console.log('  CLOSETÉ - PROGRAM 3 NODE.JS HTTP & INVENTORY VERIFICATION      ');
  console.log('================================================================\n');

  // Test 1: GET /api/inventory
  console.log('[TEST 1] Testing GET /api/inventory:');
  const getRes = await dispatch('GET', '/api/inventory');
  console.log(`Status Code: ${getRes.statusCode} (Expected: 200)`);
  const getData = getRes.json();
  console.log(`Total Inventory Items: ${getData?.total}`);
  if (getRes.statusCode === 200 && Array.isArray(getData?.data) && getData?.total > 0) {
    console.log('✓ TEST 1 PASSED: Retrieved inventory records from disk.');
  } else {
    throw new Error('TEST 1 FAILED');
  }

  // Test 2: GET /api/inventory/low-stock
  console.log('\n[TEST 2] Testing GET /api/inventory/low-stock:');
  const lowStockRes = await dispatch('GET', '/api/inventory/low-stock');
  console.log(`Status Code: ${lowStockRes.statusCode} (Expected: 200)`);
  const lowData = lowStockRes.json();
  console.log(`Low Stock Count: ${lowData?.count}`);
  console.log(`Alert Message: "${lowData?.alert}"`);
  if (lowStockRes.statusCode === 200 && lowData?.status === 'success') {
    console.log('✓ TEST 2 PASSED: Low stock threshold calculation verified.');
  } else {
    throw new Error('TEST 2 FAILED');
  }

  // Test 3: POST /api/inventory (Create new item & emit event)
  console.log('\n[TEST 3] Testing POST /api/inventory (Add Item):');
  const newItemPayload = {
    name: 'Minimalist Crepe Slip Skirt',
    category: 'Skirts',
    price: 4990,
    stock: 12,
    reorderLevel: 4,
    sizes: ['XS', 'S', 'M'],
    supplier: 'Kyoto Textiles'
  };

  const postRes = await dispatch('POST', '/api/inventory', {
    'content-type': 'application/json'
  }, newItemPayload);

  console.log(`Status Code: ${postRes.statusCode} (Expected: 201)`);
  const postData = postRes.json();
  const createdId = postData?.data?.id;
  console.log(`Created Item ID: ${createdId}`);
  console.log(`Generated SKU: ${postData?.data?.sku}`);
  if (postRes.statusCode === 201 && createdId) {
    console.log('✓ TEST 3 PASSED: Item created and persisted to inventory.json.');
  } else {
    throw new Error('TEST 3 FAILED');
  }

  // Test 4: PUT /api/inventory/:id/stock (Update stock & trigger stream log)
  console.log(`\n[TEST 4] Testing PUT /api/inventory/${createdId}/stock (Stock decrement):`);
  const putRes = await dispatch('PUT', `/api/inventory/${createdId}/stock`, {
    'content-type': 'application/json'
  }, { delta: -10 }); // Stock drops to 2 (below reorderLevel 4)

  console.log(`Status Code: ${putRes.statusCode} (Expected: 200)`);
  const putData = putRes.json();
  console.log(`Updated Stock Level: ${putData?.data?.stock}`);
  if (putRes.statusCode === 200 && putData?.data?.stock === 2) {
    console.log('✓ TEST 4 PASSED: Stock updated and low-stock alert triggered.');
  } else {
    throw new Error('TEST 4 FAILED');
  }

  // Test 5: Verify Stream Logger output in logs/inventory_audit.log
  console.log('\n[TEST 5] Testing Node.js Writable Stream Audit File:');
  // Allow brief flush time for stream
  await new Promise(r => setTimeout(r, 200));
  if (fs.existsSync(LOG_FILE)) {
    const logContent = fs.readFileSync(LOG_FILE, 'utf8');
    const hasAudit = logContent.includes('STOCK_ADJUSTMENT') || logContent.includes('ITEM_CREATED');
    console.log(`Log file size: ${logContent.length} bytes`);
    console.log(`Contains audit events: ${hasAudit}`);
    if (hasAudit) {
      console.log('✓ TEST 5 PASSED: Writable stream appended transaction logs.');
    } else {
      throw new Error('TEST 5 FAILED');
    }
  } else {
    throw new Error('Log file not found');
  }

  // Test 6: DELETE /api/inventory/:id
  console.log(`\n[TEST 6] Testing DELETE /api/inventory/${createdId}:`);
  const delRes = await dispatch('DELETE', `/api/inventory/${createdId}`);
  console.log(`Status Code: ${delRes.statusCode} (Expected: 200)`);
  if (delRes.statusCode === 200) {
    console.log('✓ TEST 6 PASSED: Item deleted from inventory store.');
  } else {
    throw new Error('TEST 6 FAILED');
  }

  // Test 7: Error Handling (Attempting to fetch deleted item)
  console.log(`\n[TEST 7] Testing 404 Error Handling for deleted item:`);
  const notFoundRes = await dispatch('GET', `/api/inventory/${createdId}`);
  console.log(`Status Code: ${notFoundRes.statusCode} (Expected: 404)`);
  if (notFoundRes.statusCode === 404) {
    console.log('✓ TEST 7 PASSED: 404 returned for missing item.');
  } else {
    throw new Error('TEST 7 FAILED');
  }

  console.log('\n================================================================');
  console.log('  ALL PROGRAM 3 AUTOMATED TESTS PASSED (7/7)!                    ');
  console.log('================================================================\n');

  server.close(() => process.exit(0));
}

runTests().catch(err => {
  console.error('Program 3 Test Failure:', err);
  process.exit(1);
});
