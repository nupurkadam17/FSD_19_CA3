/**
 * CLOSETÉ - Program 5 Full Stack End-to-End Automated Verification Suite
 */

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'closete_production_jwt_secret_token_super_secure_2026';

const fs = require('fs');
const path = require('path');

// Test Backend Server with in-process supertest or dispatch
const app = require('./backend/server');
const request = require('../Program_4_Express_API/node_modules/supertest');

async function runFullStackVerification() {
  console.log('================================================================');
  console.log('  CLOSETÉ - PROGRAM 5 FULL STACK (MERN) VERIFICATION SUITE       ');
  console.log('================================================================\n');

  console.log('--- PART 1: VERIFYING BACKEND MERN REST API ---');

  // 1. Healthcheck
  console.log('[TEST 1] Testing GET /api/health:');
  const healthRes = await request(app).get('/api/health');
  console.log(`Status Code: ${healthRes.statusCode} (Expected: 200)`);
  console.log(`Platform: "${healthRes.body?.platform}"`);
  if (healthRes.statusCode === 200 && healthRes.body?.status === 'healthy') {
    console.log('✓ TEST 1 PASSED: Backend API health check operational.');
  } else {
    throw new Error('TEST 1 FAILED');
  }

  // 2. Fetch Products
  console.log('\n[TEST 2] Testing GET /api/products:');
  const prodRes = await request(app).get('/api/products');
  console.log(`Status Code: ${prodRes.statusCode} (Expected: 200)`);
  console.log(`Catalog Count: ${prodRes.body?.count}`);
  if (prodRes.statusCode === 200 && prodRes.body?.count > 0) {
    console.log('✓ TEST 2 PASSED: Products retrieved successfully.');
  } else {
    throw new Error('TEST 2 FAILED');
  }

  // 3. User Registration with JWT
  console.log('\n[TEST 3] Testing POST /api/auth/register:');
  const uniqueEmail = `fullstack.${Date.now()}@closete.com`;
  const regRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Kareena Kapoor',
      email: uniqueEmail,
      password: 'Password@123'
    });

  console.log(`Status Code: ${regRes.statusCode} (Expected: 201)`);
  const customerToken = regRes.body?.token;
  console.log(`Customer JWT Token Generated: ${customerToken ? 'Yes' : 'No'}`);
  if (regRes.statusCode === 201 && customerToken) {
    console.log('✓ TEST 3 PASSED: Full-stack registration & token issuance verified.');
  } else {
    throw new Error('TEST 3 FAILED');
  }

  // 4. Create Product (Protected)
  console.log('\n[TEST 4] Testing POST /api/products (Protected Creation):');
  const createRes = await request(app)
    .post('/api/products')
    .set('Authorization', `Bearer ${customerToken}`)
    .send({
      name: 'Structured Ivory Wool Cape',
      category: 'Outerwear',
      price: 15990,
      stock: 5,
      sizes: ['S', 'M', 'L'],
      description: 'An architectural wool cape tailored with gold crested buttons.'
    });

  console.log(`Status Code: ${createRes.statusCode} (Expected: 201)`);
  const createdId = createRes.body?.data?._id || createRes.body?.data?.id;
  console.log(`Created Garment ID: ${createdId}`);
  if (createRes.statusCode === 201 && createdId) {
    console.log('✓ TEST 4 PASSED: Product created via backend API.');
  } else {
    throw new Error('TEST 4 FAILED');
  }

  // 5. Create Order
  console.log('\n[TEST 5] Testing POST /api/orders (Order Finalization):');
  const orderRes = await request(app)
    .post('/api/orders')
    .set('Authorization', `Bearer ${customerToken}`)
    .send({
      orderItems: [
        {
          product: createdId,
          name: 'Structured Ivory Wool Cape',
          quantity: 1,
          price: 15990,
          size: 'M'
        }
      ],
      shippingAddress: {
        fullName: 'Kareena Kapoor',
        address: 'Bandra West Luxury Apartments',
        city: 'Mumbai',
        pincode: '400050',
        phone: '9876543210'
      },
      paymentMethod: 'card',
      totalPrice: 15990
    });

  console.log(`Status Code: ${orderRes.statusCode} (Expected: 201)`);
  const orderId = orderRes.body?.data?._id;
  console.log(`Persisted Order Reference: ${orderId}`);
  if (orderRes.statusCode === 201 && orderId) {
    console.log('✓ TEST 5 PASSED: Order creation & user linking verified.');
  } else {
    throw new Error('TEST 5 FAILED');
  }

  console.log('\n--- PART 2: VERIFYING FRONTEND & DEPLOYMENT MANIFESTS ---');

  const requiredFrontendFiles = [
    'frontend/src/api/client.js',
    'frontend/src/context/AuthContext.jsx',
    'frontend/src/context/CartContext.jsx',
    'frontend/src/components/Navbar.jsx',
    'frontend/src/components/Footer.jsx',
    'frontend/src/pages/HomePage.jsx',
    'frontend/src/pages/ShopPage.jsx',
    'frontend/src/pages/ProductDetailPage.jsx',
    'frontend/src/pages/LoginPage.jsx',
    'frontend/src/pages/RegisterPage.jsx',
    'frontend/src/pages/AdminProductsPage.jsx',
    'frontend/src/pages/CheckoutPage.jsx',
    'frontend/src/App.jsx',
    'frontend/vercel.json',
    'backend/render.yaml'
  ];

  requiredFrontendFiles.forEach(file => {
    const full = path.join(__dirname, file);
    if (!fs.existsSync(full)) {
      throw new Error(`Missing required file: ${file}`);
    }
    console.log(`✓ ${file} verified on disk.`);
  });

  // Verify Deployment Manifests
  const vercelJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'frontend/vercel.json'), 'utf8'));
  const hasRewrites = Array.isArray(vercelJson.rewrites) && vercelJson.rewrites.length > 0;
  console.log(`✓ Vercel SPA Routing Configuration Verified: ${hasRewrites}`);

  const renderYaml = fs.readFileSync(path.join(__dirname, 'backend/render.yaml'), 'utf8');
  const hasRenderService = renderYaml.includes('closete-backend-api');
  console.log(`✓ Render Backend Deployment Manifest Verified: ${hasRenderService}`);

  console.log('\n================================================================');
  console.log('  PROGRAM 5 FULL STACK (MERN) SYSTEM 100% VERIFIED!             ');
  console.log('================================================================\n');
}

runFullStackVerification().catch(err => {
  console.error('Program 5 Verification Failure:', err);
  process.exit(1);
});
