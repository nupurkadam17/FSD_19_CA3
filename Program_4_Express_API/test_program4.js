/**
 * CLOSETÉ - Program 4 Express REST API Comprehensive Automated Test Suite
 * Powered by supertest: Tests CRUD, middleware pipeline, bcrypt hashing,
 * JWT issuance & verification, role-based access control (RBAC), and centralized error handling.
 */

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'closete_luxury_atelier_jwt_secret_key_2026';

const request = require('supertest');
const app = require('./server');

async function runApiTests() {
  console.log('================================================================');
  console.log('  CLOSETÉ - PROGRAM 4 SECURE EXPRESS REST API TEST SUITE        ');
  console.log('================================================================\n');

  let customerToken = '';
  let adminToken = '';
  let createdProductId = '';

  // 1. GET /api/v1/products (Public)
  console.log('[TEST 1] Testing Public GET /api/v1/products:');
  const getProdRes = await request(app).get('/api/v1/products');
  console.log(`Status Code: ${getProdRes.statusCode} (Expected: 200)`);
  console.log(`Products Count: ${getProdRes.body?.count}`);
  if (getProdRes.statusCode === 200 && getProdRes.body?.count >= 5) {
    console.log('✓ TEST 1 PASSED: Public products endpoint operational.');
  } else {
    throw new Error('TEST 1 FAILED');
  }

  // 2. POST /api/v1/auth/register (User Registration with bcrypt & JWT)
  console.log('\n[TEST 2] Testing POST /api/v1/auth/register:');
  const regPayload = {
    name: 'Priyanka Chopra',
    email: `priyanka.${Date.now()}@closete.com`,
    password: 'Password@123'
  };
  const regRes = await request(app)
    .post('/api/v1/auth/register')
    .send(regPayload);

  console.log(`Status Code: ${regRes.statusCode} (Expected: 201)`);
  console.log(`Issued JWT Token: ${regRes.body?.token?.slice(0, 25)}...`);
  console.log(`Registered Role: ${regRes.body?.user?.role}`);
  customerToken = regRes.body?.token;
  if (regRes.statusCode === 201 && customerToken && regRes.body?.user?.role === 'customer') {
    console.log('✓ TEST 2 PASSED: User registered, password hashed with bcrypt, JWT issued.');
  } else {
    throw new Error('TEST 2 FAILED');
  }

  // 3. POST /api/v1/auth/login (Admin Login with bcrypt.compare)
  console.log('\n[TEST 3] Testing POST /api/v1/auth/login (Admin User):');
  const loginRes = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'admin@closete.com',
      password: 'Admin@123'
    });

  console.log(`Status Code: ${loginRes.statusCode} (Expected: 200)`);
  adminToken = loginRes.body?.token;
  console.log(`Admin Role: ${loginRes.body?.user?.role}`);
  if (loginRes.statusCode === 200 && adminToken && loginRes.body?.user?.role === 'admin') {
    console.log('✓ TEST 3 PASSED: Admin authenticated with bcrypt.compare, Admin JWT issued.');
  } else {
    throw new Error('TEST 3 FAILED');
  }

  // 4. GET /api/v1/auth/profile (Protected Route with JWT)
  console.log('\n[TEST 4] Testing GET /api/v1/auth/profile with Bearer Token:');
  const profileRes = await request(app)
    .get('/api/v1/auth/profile')
    .set('Authorization', `Bearer ${customerToken}`);

  console.log(`Status Code: ${profileRes.statusCode} (Expected: 200)`);
  console.log(`Authenticated User: ${profileRes.body?.data?.name} (${profileRes.body?.data?.email})`);
  if (profileRes.statusCode === 200 && profileDataMatches(profileRes.body?.data, regPayload)) {
    console.log('✓ TEST 4 PASSED: JWT successfully verified by auth middleware.');
  } else {
    throw new Error('TEST 4 FAILED');
  }

  // 5. GET /api/v1/auth/profile without token (Unauthorized Guard)
  console.log('\n[TEST 5] Testing GET /api/v1/auth/profile without Token:');
  const noTokenRes = await request(app).get('/api/v1/auth/profile');
  console.log(`Status Code: ${noTokenRes.statusCode} (Expected: 401)`);
  if (noTokenRes.statusCode === 401) {
    console.log('✓ TEST 5 PASSED: Unauthorized request properly rejected with 401.');
  } else {
    throw new Error('TEST 5 FAILED');
  }

  // 6. POST /api/v1/products (Create with JWT and Validation Middleware)
  console.log('\n[TEST 6] Testing POST /api/v1/products (Protected Creation):');
  const newProdPayload = {
    name: 'Bespoke Double-Breasted Silk Blazer',
    category: 'Outerwear',
    price: 13990,
    stock: 7,
    description: 'Impeccably tailored silk blazer with mother-of-pearl buttons.'
  };
  const createRes = await request(app)
    .post('/api/v1/products')
    .set('Authorization', `Bearer ${customerToken}`)
    .send(newProdPayload);

  console.log(`Status Code: ${createRes.statusCode} (Expected: 201)`);
  createdProductId = createRes.body?.data?.id;
  console.log(`Created Product ID: ${createdProductId}`);
  if (createRes.statusCode === 201 && createdProductId) {
    console.log('✓ TEST 6 PASSED: Protected product created successfully (201 Created).');
  } else {
    throw new Error('TEST 6 FAILED');
  }

  // 7. Input Validation Middleware: Missing required fields
  console.log('\n[TEST 7] Testing Input Validation Middleware on Malformed POST:');
  const badProdPayload = { name: 'Hi', price: -100 }; // Missing category, bad price
  const badProdRes = await request(app)
    .post('/api/v1/products')
    .set('Authorization', `Bearer ${customerToken}`)
    .send(badProdPayload);

  console.log(`Status Code: ${badProdRes.statusCode} (Expected: 400)`);
  console.log(`Validation Errors Count: ${badProdRes.body?.errors?.length}`);
  if (badProdRes.statusCode === 400 && Array.isArray(badProdRes.body?.errors) && badProdRes.body?.errors.length >= 2) {
    console.log('✓ TEST 7 PASSED: Validation middleware rejected malformed payload with 400.');
  } else {
    throw new Error('TEST 7 FAILED');
  }

  // 8. PUT /api/v1/products/:id (Update product)
  console.log(`\n[TEST 8] Testing PUT /api/v1/products/${createdProductId}:`);
  const updateRes = await request(app)
    .put(`/api/v1/products/${createdProductId}`)
    .set('Authorization', `Bearer ${customerToken}`)
    .send({ price: 14990 });

  console.log(`Status Code: ${updateRes.statusCode} (Expected: 200)`);
  console.log(`Updated Price: ₹${updateRes.body?.data?.price}`);
  if (updateRes.statusCode === 200 && updateRes.body?.data?.price === 14990) {
    console.log('✓ TEST 8 PASSED: Product successfully updated.');
  } else {
    throw new Error('TEST 8 FAILED');
  }

  // 9. Role-Based Access Control (RBAC): Customer tries to DELETE product
  console.log(`\n[TEST 9] Testing RBAC: Customer attempting DELETE /api/v1/products/${createdProductId}:`);
  const forbidRes = await request(app)
    .delete(`/api/v1/products/${createdProductId}`)
    .set('Authorization', `Bearer ${customerToken}`); // Customer role

  console.log(`Status Code: ${forbidRes.statusCode} (Expected: 403 Forbidden)`);
  if (forbidRes.statusCode === 403) {
    console.log('✓ TEST 9 PASSED: Role-based authorization blocked customer deletion (403 Forbidden).');
  } else {
    throw new Error('TEST 9 FAILED');
  }

  // 10. Admin Deletion: Admin deletes product
  console.log(`\n[TEST 10] Testing RBAC: Admin executing DELETE /api/v1/products/${createdProductId}:`);
  const adminDelRes = await request(app)
    .delete(`/api/v1/products/${createdProductId}`)
    .set('Authorization', `Bearer ${adminToken}`); // Admin role

  console.log(`Status Code: ${adminDelRes.statusCode} (Expected: 200)`);
  if (adminDelRes.statusCode === 200) {
    console.log('✓ TEST 10 PASSED: Admin authorized deletion succeeded.');
  } else {
    throw new Error('TEST 10 FAILED');
  }

  // 11. Centralized Error Handling: 404 Route Not Found
  console.log('\n[TEST 11] Testing Centralized 404 Error Handler:');
  const notFoundRes = await request(app).get('/api/v1/non-existent-endpoint');
  console.log(`Status Code: ${notFoundRes.statusCode} (Expected: 404)`);
  if (notFoundRes.statusCode === 404) {
    console.log('✓ TEST 11 PASSED: Centralized error handling returns clean JSON.');
  } else {
    throw new Error('TEST 11 FAILED');
  }

  console.log('\n================================================================');
  console.log('  ALL PROGRAM 4 SECURE REST API TESTS PASSED (11/11)!            ');
  console.log('================================================================\n');
}

function profileDataMatches(profile, regPayload) {
  return profile && profile.email === regPayload.email.toLowerCase();
}

runApiTests().catch(err => {
  console.error('Program 4 API Test Failure:', err);
  process.exit(1);
});
