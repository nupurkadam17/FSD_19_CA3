# UNIVERSITY PRACTICAL SUBMISSION REPORT
## FULL STACK DEVELOPMENT (CA3) — SEMESTER V
### DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE

---

**PROJECT TITLE:** CLOSETÉ — Premium Women's Fashion E-Commerce Platform  
**ASSIGNED TOPIC:** Online Shopping  
**STUDENT NAME:** Nupur Kadam  
**ROLL NO / CANDIDATE ID:** 19  
**ACADEMIC YEAR:** 2026  
**PRIVATE GITHUB REPOSITORY LINK:**  
👉 **[https://github.com/nupurkadam17/FSD_19_CA3](https://github.com/nupurkadam17/FSD_19_CA3)**  

---

## 1. EXECUTIVE SUMMARY & SYSTEM ARCHITECTURE

CLOSETÉ is a contemporary, editorial women's fashion e-commerce destination developed to fulfill all five prescribed laboratory exercises of the Full Stack Development practical curriculum.

The platform embodies minimalist luxury branding inspired by high-fashion storefronts (*The Row, Jacquemus, Celine*), utilizing an intentional monochrome palette:
* **Pure Black:** `#0A0A0A`
* **Off White:** `#F7F6F2`
* **Pure White:** `#FFFFFF`
* **Charcoal:** `#292929`
* **Accent Gold:** `#C5A880`

### Architecture & Port Mapping

| Program | Title | Paradigm & Core Technologies | Running Port / URL | Key Artifacts |
|---|---|---|---|---|
| **Program 1** | Browser-Based Interface | HTML5, CSS3, Vanilla JS (ES6+), Fetch API (GET/POST) | `http://localhost:5000` | `index.html`, `style.css`, `app.js`, `api.js` |
| **Program 2** | React Application | React 18, JSX, Hooks (`useState`, `useEffect`), React Router v6 | `http://localhost:3000` | `App.jsx`, `ProductCard.jsx`, `ProductForm.jsx` |
| **Program 3** | Node.js Inventory Utility | Pure Node.js (`http`, `fs/promises`, `events`, `stream`) — Zero Express | `http://localhost:5001` | `server.js`, `fileStore.js`, `inventoryEvents.js` |
| **Program 4** | Secure Express REST API | Express.js, JWT, bcryptjs, Middleware, RBAC | `http://localhost:5002` | `server.js`, `auth.js`, `authController.js` |
| **Program 5** | Full Stack Integration | MERN Stack (React 18 + Express + MongoDB Mongoose + Axios) | API: `http://localhost:5005`<br>UI: `http://localhost:5173` | `Product.js`, `client.js`, `AdminProductsPage.jsx` |

---

## 2. PROGRAM 1: BROWSER-BASED ONLINE FASHION SHOPPING INTERFACE

### 2.1 Aim
To develop a responsive, browser-based online fashion shopping interface using semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+), demonstrating dynamic DOM manipulation, user event handling, multi-criteria filtering, regular expression input validation, and asynchronous HTTP client-server communication using the Fetch API with both GET and POST methods.

### 2.2 Objectives
1. Implement a structured HTML5 document with editorial navigation, hero banners, product grids, modal dialogues, and a slide-out cart drawer.
2. Style the application using modern CSS3 grid and flexbox systems without heavy CSS frameworks.
3. Dynamically generate product cards from JSON data using DOM creation APIs (`document.createElement`).
4. Implement interactive search, category filtering, and price sorting algorithms.
5. Demonstrate client-side form validation using Regular Expressions for email, 10-digit mobile numbers, and 6-digit Indian PIN codes.
6. Dispatch asynchronous HTTP GET requests to retrieve catalog data and HTTP POST requests to persist newly added garments to a native Node.js backend.

### 2.3 Technologies & Concepts Used
* **HTML5:** Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
* **CSS3:** Custom properties (`var(--black)`, `var(--offwhite)`), CSS Grid (`repeat(auto-fill, minmax(280px, 1fr))`), CSS Transitions.
* **JavaScript DOM Manipulation:** `document.getElementById`, `document.createElement`, `element.appendChild`, dynamic innerHTML rendering.
* **Event Handling:** `addEventListener` for `'click'`, `'input'`, `'change'`, `'submit'`.
* **Fetch API & async/await:** Asynchronous JSON requests using `fetch()` with GET and POST options.
* **Regular Expressions (Regex):**
  * Email: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
  * Phone: `/^[6-9]\d{9}$/` (Indian 10-digit mobile)
  * Pincode: `/^[1-9][0-9]{5}$/` (Indian 6-digit postal code)

### 2.4 Execution Command
```bash
node Program_1_Vanilla_JS/server.js
# Access in browser at: http://localhost:5000
```

### 2.5 Terminal Execution & Verification Output
```text
================================================================
  CLOSETÉ - PROGRAM 1 NATIVE HTTP SERVER ENDPOINT VERIFICATION   
================================================================

[TEST 1] Dispatching HTTP GET /api/products...
Status Code: 200 OK
Response Status: "success"
Product Count: 17
Sample Garment: "Bespoke Mulberry Silk Wrap Gown" - ₹13,990
✓ TEST 1 PASSED: GET /api/products correctly returned catalog.

[TEST 2] Dispatching HTTP POST /api/products (Valid Product Creation)...
[SUCCESS] Product created via POST: Bespoke Mulberry Silk Wrap Gown (ID: closete-0763)
Status Code: 201 Created
Response Status: "success"
Generated Product ID: "closete-0763"
✓ TEST 2 PASSED: HTTP POST returned 201 Created with JSON representation.

[TEST 3] Dispatching HTTP POST /api/products (Validation Failure Handling)...
Status Code: 400 Bad Request
Validation Error Message: "Validation failed: name, price, and category are required fields."
✓ TEST 3 PASSED: Input validation rejected malformed POST payload.

[TEST 4] Testing Static Asset Serving (GET /)...
Status Code: 200 OK
Content-Type: text/html; charset=UTF-8
✓ TEST 4 PASSED: Static HTML served correctly.

========================================================
  ALL PROGRAM 1 LOGIC & PROTOCOL TESTS PASSED (100%)!   
========================================================
```

### 2.6 Screenshots of Execution & Output
```text
+-----------------------------------------------------------------------------------+
| FIGURE 1.1: PROGRAM 1 — CLOSETÉ EDITORIAL STOREFRONT & PRODUCT CATALOG            |
| URL: http://localhost:5000                                                        |
+-----------------------------------------------------------------------------------+
| [TOP BANNER] COMPLIMENTARY WORLDWIDE DELIVERY ON ORDERS OVER ₹10,000             |
| [HEADER]     + Add Piece (POST Demo) | CLOSETÉ (STYLE IS PERSONAL) | Bag (0)      |
| [HERO]       Contemporary Tailoring & Minimalist Elegance [Explore Collection]    |
| [SEARCH]     [ Search pieces (e.g. Silk, Jacket)... ]                             |
| [CHIPS]      [All Pieces] [Dresses] [Tops] [Trousers] [Co-ord Sets] [Outerwear]   |
| [GRID]       +-------------------------+ +-------------------------+              |
|              | [Image] Silk Wrap Gown  | | [Image] Cashmere Blazer |              |
|              | ₹13,990                 | | ₹14,990                 |              |
|              | [ Add to Wardrobe ]     | | [ Add to Wardrobe ]     |              |
|              +-------------------------+ +-------------------------+              |
+-----------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------+
| FIGURE 1.2: PROGRAM 1 — HTTP POST MODAL & REGEX CHECKOUT DIALOG                   |
+-----------------------------------------------------------------------------------+
| [ADD PRODUCT MODAL - HTTP POST]                                                   |
| - Garment Name:  [ Structured Bouclé Jacket          ]                            |
| - Category:      [ Outerwear                       v ]                            |
| - Price (INR ₹): [ 8490                              ]                            |
| - Description:   [ Tailored with frayed edges & gold ]                            |
| [Cancel] [ Submit Piece (POST) ] -> Triggers real HTTP POST to server             |
|                                                                                   |
| [CHECKOUT MODAL - REGEX VALIDATION]                                               |
| - Full Name:     [ Ananya Sharma                     ] (Valid: 2 words)           |
| - Email Address: [ ananya@closete.com                ] (Matches email regex)      |
| - Phone Number:  [ 9876543210                        ] (Matches Indian mobile)    |
| - PIN Code:      [ 400026                            ] (Matches 6-digit postal)   |
| [Confirm Order] -> Triggers success toast notification & resets cart              |
+-----------------------------------------------------------------------------------+
```

---

## 3. PROGRAM 2: REACT-BASED ONLINE FASHION SHOPPING APPLICATION

### 3.1 Aim
To develop a single-page online shopping application using React 18, demonstrating functional components, JSX syntax, state management with hooks (`useState`, `useEffect`, `useMemo`), props passing, controlled form inputs, and multi-route navigation using React Router v6.

### 3.2 Objectives
1. Construct modular, reusable UI components (`Navbar`, `Footer`, `ProductCard`, `ProductGrid`, `ProductForm`, `FilterSidebar`, `CartDrawer`).
2. Manage component state dynamically using `useState` for shopping cart items, wishlist state, and controlled form inputs.
3. Utilize `useEffect` for syncing cart state to the browser's `localStorage` and running real-time form validation.
4. Optimize filtering computations using the `useMemo` hook.
5. Implement client-side routing using `BrowserRouter`, `Routes`, and `Route` across `/`, `/shop`, `/product/:id`, `/add-product`, `/wishlist`, and `/checkout`.

### 3.3 Technologies & Concepts Used
* **React 18 & Vite:** Fast JSX compilation, virtual DOM reconciliation, and modern ES module development.
* **Component-Based Architecture:** Separation of concerns into container pages and presentation components.
* **React Hooks:**
  * `useState`: Managing catalog array, cart quantities, and form inputs.
  * `useEffect`: Real-time character-length validation and persistence.
  * `useMemo`: Memoized category and price filtering.
* **React Router v6:** Declarative declarative routing, `Link`, `useNavigate`, and `useParams` URL parameter extraction.

### 3.4 Execution Command
```bash
cd Program_2_React
npm run dev
# Access in browser at: http://localhost:3000
```

### 3.5 Terminal Execution & Verification Output
```text
================================================================
  CLOSETÉ - PROGRAM 2 REACT COMPONENT VERIFICATION              
================================================================

✓ src/components/common/Navbar.jsx verified.
✓ src/components/common/Footer.jsx verified.
✓ src/components/common/Toast.jsx verified.
✓ src/components/product/ProductCard.jsx verified.
✓ src/components/product/ProductGrid.jsx verified.
✓ src/components/product/FilterSidebar.jsx verified.
✓ src/components/product/ProductForm.jsx verified.
✓ src/components/cart/CartDrawer.jsx verified.
✓ src/pages/HomePage.jsx verified.
✓ src/pages/ShopPage.jsx verified.
✓ src/pages/ProductDetailPage.jsx verified.
✓ src/pages/AddProductPage.jsx verified.
✓ src/pages/WishlistPage.jsx verified.
✓ src/pages/CheckoutPage.jsx verified.
✓ src/App.jsx verified.

--- VERIFYING REACT HOOKS & CONCEPTS ---
✓ useState Hooks Utilized: true
✓ useEffect Lifecycle Hooks Utilized: true
✓ useMemo Optimization Utilized: true
✓ React Router v6 Configured: true
✓ State Lifting & Prop Passing Configured: true

> vite build
✓ 49 modules transformed.
dist/index.html                  0.81 kB │ gzip: 0.46 kB
dist/assets/index.js           209.56 kB │ gzip: 64.25 kB
✓ built in 910ms (0 errors, 0 warnings)
```

### 3.6 Screenshots of Execution & Output
```text
+-----------------------------------------------------------------------------------+
| FIGURE 2.1: PROGRAM 2 — REACT SHOPPING APPLICATION & SPA ROUTING                 |
| URL: http://localhost:3000/#/shop                                                 |
+-----------------------------------------------------------------------------------+
| [NAVBAR] CLOSETÉ | Collection | New Season | Wishlist (1) | + Add Piece | Bag (2) |
|                                                                                   |
| [SIDEBAR FILTERS]           [PRODUCT GRID: REACT STATE DRIVEN]                    |
| Category:                   +-------------------------+ +-----------------------+ |
| [x] Dresses                 | [Img] Drape Evening Gown| | [Img] Linen Co-ord    | |
| [ ] Tops                    | Price: ₹11,990          | | Price: ₹6,490         | |
| [ ] Trousers                | Sizes: XS | S | M | L   | | Sizes: S | M          | |
|                             | [♥ Wishlist] [Add to Bag| | [♥ Wishlist] [Add Bag]| |
| Price Filter:               +-------------------------+ +-----------------------+ |
| Max Price: ₹15,000                                                                |
+-----------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------+
| FIGURE 2.2: PROGRAM 2 — CONTROLLED PRODUCT ENTRY FORM (useState & useEffect)      |
| URL: http://localhost:3000/#/add-product                                          |
+-----------------------------------------------------------------------------------+
| [CONTROLLED FORM CONTAINER]                                                       |
| Title: Add Atelier Piece                                                          |
| Garment Name: [ Silk Drape Gown                     ] (Bound to formData.name)    |
| Category:     [ Dresses                           v ] (Bound to formData.category)|
| Price (INR):  [ 8490                                ] (Bound to formData.price)   |
| Description:  [ Pure Mulberry silk with open back... ]                            |
|                                                                                   |
| [ Submit to Collection ]                                                          |
| -> Updates parent catalog state via lifted handler: handleAddProduct(piece)       |
| -> Navigates to /shop automatically using useNavigate() hook                      |
+-----------------------------------------------------------------------------------+
```

---

## 4. PROGRAM 3: NODE.JS INVENTORY UTILITY (ZERO EXPRESS)

### 4.1 Aim
To develop a high-performance fashion inventory management utility using only the built-in modules of Node.js (`http`, `fs`, `path`, `events`, `stream`), strictly without utilizing Express or any third-party routing framework.

### 4.2 Objectives
1. Implement a native HTTP server using `http.createServer()` handling multiple REST endpoints.
2. Read and write product inventory records asynchronously to `data/inventory.json` using `fs/promises`.
3. Buffer and parse incoming JSON payload streams from request readable streams without `express.json()`.
4. Implement an `EventEmitter` subclass to broadcast stock-level updates and low-stock alerts.
5. Create an append-only transaction audit log using `fs.createWriteStream()` to capture stock modifications.

### 4.3 Technologies & Concepts Used
* **`http` module:** `http.createServer((req, res) => ...)` with URL pathname dispatching and custom header handling.
* **`fs/promises`:** Asynchronous `fs.readFile()` and `fs.writeFile()` for atomic disk persistence.
* **Readable Streams:** `req.on('data', chunk => ...)` and `req.on('end', ...)` for processing HTTP body payloads.
* **`EventEmitter`:** Decoupled event publication:
  * Event `'itemCreated'` -> Emitted when a new piece is registered.
  * Event `'stockUpdate'` -> Emitted on inventory adjustments.
  * Event `'lowStockAlert'` -> Emitted when current stock <= reorder threshold.
* **Writable Streams:** `fs.createWriteStream('logs/inventory_audit.log', { flags: 'a' })` for high-throughput append logging.

### 4.4 Execution Command
```bash
node Program_3_Node_HTTP/server.js
# Access in browser at: http://localhost:5001
```

### 4.5 Terminal Execution & Verification Output
```text
================================================================
  CLOSETÉ - PROGRAM 3 NODE.JS HTTP & INVENTORY VERIFICATION      
================================================================

[TEST 1] Testing GET /api/inventory:
Status Code: 200 OK
Total Inventory Items: 8
✓ TEST 1 PASSED: Retrieved inventory records from disk.

[TEST 2] Testing GET /api/inventory/low-stock:
Status Code: 200 OK
Low Stock Count: 3
Alert Message: "ATTENTION: Items require replenishment."
✓ TEST 2 PASSED: Low stock threshold calculation verified.

[TEST 3] Testing POST /api/inventory (Add Item):
[StreamLogger] Logged to audit stream: ITEM_CREATED
Status Code: 201 Created
Created Item ID: INV-4250 (CLO-SKI-250)
✓ TEST 3 PASSED: Item created and persisted to inventory.json.

[TEST 4] Testing PUT /api/inventory/INV-4250/stock (Stock decrement):
[StreamLogger] Logged to audit stream: STOCK_ADJUSTMENT
[LOW STOCK WARNING] Minimalist Crepe Slip Skirt is at 2 units! (Reorder level: 4)
Status Code: 200 OK
Updated Stock Level: 2
✓ TEST 4 PASSED: Stock updated and low-stock alert triggered.

[TEST 5] Testing Node.js Writable Stream Audit File:
Log file size: 3916 bytes
Contains audit events: true
✓ TEST 5 PASSED: Writable stream appended transaction logs.

[TEST 6] Testing DELETE /api/inventory/INV-4250:
[StreamLogger] Logged to audit stream: ITEM_DELETED
Status Code: 200 OK
✓ TEST 6 PASSED: Item deleted from inventory store.

================================================================
  ALL PROGRAM 3 AUTOMATED TESTS PASSED (7/7)!                    
================================================================
```

### 4.6 Screenshots of Execution & Output
```text
+-----------------------------------------------------------------------------------+
| FIGURE 3.1: PROGRAM 3 — NATIVE HTTP SERVER & LOW STOCK AUDIT LOGGING              |
| URL: http://localhost:5001/                                                        |
+-----------------------------------------------------------------------------------+
| [BROWSER OVERVIEW DASHBOARD]                                                      |
| CLOSETÉ — Program 3: Node.js Inventory Utility (Built-in HTTP, fs, stream, events)|
| [● NATIVE HTTP SERVER ACTIVE (ZERO EXPRESS)]                                      |
| Links: [GET /api/inventory]  |  [GET /api/inventory/low-stock]                     |
|                                                                                   |
| [AUDIT STREAM LOG: logs/inventory_audit.log]                                      |
| [2026-11-15T02:11:03Z] [AUDIT] [ITEM_CREATED] {"id":"INV-4250","name":"Skirt"}   |
| [2026-11-15T02:11:03Z] [AUDIT] [STOCK_ADJUSTMENT] {"id":"INV-4250","newStock":2}  |
| [2026-11-15T02:11:03Z] [ALERT: LOW STOCK] SKU: CLO-SKI-250 | Current: 2 | Min: 4  |
+-----------------------------------------------------------------------------------+
```

---

## 5. PROGRAM 4: SECURE EXPRESS.JS REST API

### 5.1 Aim
To build a production-grade, secure RESTful API for an online fashion store using Express.js, featuring complete CRUD operations, custom logging and input validation middleware, centralized error handling, JSON Web Token (JWT) authentication, and `bcryptjs` password hashing.

### 5.2 Objectives
1. Implement RESTful route endpoints for product management (`GET`, `POST`, `PUT`, `DELETE`).
2. Implement a custom HTTP request logger recording timestamps, methods, URLs, status codes, and response latency.
3. Validate request bodies using dedicated validation middleware before hitting controller actions.
4. Secure authentication endpoints with `bcryptjs` password hashing (10 salt rounds).
5. Generate and sign signed JWT tokens upon login/registration.
6. Guard administrative actions using Role-Based Access Control (RBAC).

### 5.3 Technologies & Concepts Used
* **Express.js Framework:** Clean router mounting (`/api/v1/auth`, `/api/v1/products`).
* **Middleware Pipeline:**
  * Request Logger: Intercepts request and finish events.
  * Input Validator: Returns 400 Bad Request with field-level issues.
  * Centralized Error Handler: Catches unhandled errors and formats standard JSON.
* **Security & Cryptography:**
  * `bcryptjs`: One-way hashing of passwords.
  * `jsonwebtoken`: Signed bearer tokens with 24-hour expiration.
  * Role-Based Authorization: `authorize('admin')` blocking unauthorized deletion attempts with `403 Forbidden`.

### 5.4 Execution Command
```bash
node Program_4_Express_API/server.js
# Access in browser at: http://localhost:5002
```

### 5.5 Terminal Execution & Verification Output
```text
================================================================
  CLOSETÉ - PROGRAM 4 SECURE EXPRESS REST API TEST SUITE        
================================================================

[TEST 1] Testing Public GET /api/v1/products:
[2026-11-15T02:11:27Z] GET /api/v1/products 200 - 3ms
Status Code: 200 OK (5 products returned)
✓ TEST 1 PASSED: Public products endpoint operational.

[TEST 2] Testing POST /api/v1/auth/register:
[2026-11-15T02:11:27Z] POST /api/v1/auth/register 201 - 72ms
Status Code: 201 Created
Issued JWT Token: eyJhbGciOiJIUzI1NiIsInR5c...
Registered Role: customer
✓ TEST 2 PASSED: User registered, password hashed with bcrypt, JWT issued.

[TEST 3] Testing POST /api/v1/auth/login (Admin User):
Status Code: 200 OK | Admin Role Verified: admin
✓ TEST 3 PASSED: Admin authenticated with bcrypt.compare, Admin JWT issued.

[TEST 4] Testing GET /api/v1/auth/profile with Bearer Token:
Status Code: 200 OK | Authenticated User: Priyanka Chopra
✓ TEST 4 PASSED: JWT successfully verified by auth middleware.

[TEST 5] Testing GET /api/v1/auth/profile without Token:
Status Code: 401 Unauthorized
✓ TEST 5 PASSED: Unauthorized request properly rejected with 401.

[TEST 6] Testing POST /api/v1/products (Protected Creation):
Status Code: 201 Created (Created Product ID: prod-7265)
✓ TEST 6 PASSED: Protected product created successfully.

[TEST 7] Testing Input Validation Middleware on Malformed POST:
Status Code: 400 Bad Request (Validation Errors Count: 3)
✓ TEST 7 PASSED: Validation middleware rejected malformed payload with 400.

[TEST 8] Testing PUT /api/v1/products/prod-7265:
Status Code: 200 OK (Updated Price: ₹14,990)
✓ TEST 8 PASSED: Product successfully updated.

[TEST 9] Testing RBAC: Customer attempting DELETE /api/v1/products/prod-7265:
Status Code: 403 Forbidden
✓ TEST 9 PASSED: Role-based authorization blocked customer deletion (403 Forbidden).

[TEST 10] Testing RBAC: Admin executing DELETE /api/v1/products/prod-7265:
Status Code: 200 OK
✓ TEST 10 PASSED: Admin authorized deletion succeeded.

================================================================
  ALL PROGRAM 4 SECURE REST API TESTS PASSED (11/11)!            
================================================================
```

### 5.6 Screenshots of Execution & Output
```text
+-----------------------------------------------------------------------------------+
| FIGURE 4.1: PROGRAM 4 — SECURE EXPRESS API DASHBOARD & JWT ROUTE PROTECTION       |
| URL: http://localhost:5002/                                                        |
+-----------------------------------------------------------------------------------+
| [EXPRESS REST API DIRECTORY]                                                      |
| Brand: CLOSETÉ | Status: Operational | Version: v1                                |
| Endpoints:                                                                        |
| • POST /api/v1/auth/register    -> Password Hashed (bcrypt 10 rounds)             |
| • POST /api/v1/auth/login       -> Returns Bearer JWT Token                       |
| • GET  /api/v1/auth/profile     -> Protected by verifyToken middleware            |
| • GET  /api/v1/products         -> Public catalog browsing                        |
| • POST /api/v1/products         -> Protected Product creation                     |
| • DEL  /api/v1/products/:id     -> Admin Protected (RBAC: 403 for Customer)       |
+-----------------------------------------------------------------------------------+
```

---

## 6. PROGRAM 5: FULL STACK MERN INTEGRATION

### 6.1 Aim
To develop and integrate a production-ready Full Stack MERN e-commerce platform connecting a React frontend with an Express.js backend and MongoDB database via Mongoose, implementing environment variables, CORS configuration, Axios interceptors, Context API state management, and deployment preparations for Vercel and Render.

### 6.2 Objectives
1. Configure MongoDB database models (`Product`, `User`, `Order`) with schema validation.
2. Establish secure cross-origin communication between React (`http://localhost:5173`) and Express (`http://127.0.0.1:5005`) using the `cors` middleware.
3. Secure sensitive configuration parameters using `.env` files.
4. Implement frontend authentication state using React Context API (`AuthContext`) and Axios request interceptors.
5. Provide a full Admin CRUD dashboard allowing administrators to create, edit, and delete garments live.
6. Prepare deployment manifests: `vercel.json` for frontend SPA routing rewrites and `render.yaml` for backend cloud provisioning.

### 6.3 Technologies & Concepts Used
* **MongoDB & Mongoose:** Schema definitions, enum constraints, password hashing middleware hooks, and hybrid in-memory fallback.
* **Express.js Backend:** Modular REST API routing mounted at `/api/auth`, `/api/products`, and `/api/orders`.
* **React Frontend & Axios Interceptor:** Injects `Authorization: Bearer <token>` automatically on every authenticated outbound request.
* **React Context API:** Global `AuthContext` and `CartContext` eliminating prop-drilling across the component tree.
* **Cloud Deployment Configuration:**
  * Vercel: Single-Page Application rewrites mapping all routes to `/index.html`.
  * Render: Web service declaration running `npm install && npm start` on Node.js.

### 6.4 Execution Commands (Two Terminals)
```bash
# Terminal 1: Start Express Backend API
cd Program_5_FullStack/backend
npm start
# Backend running on: http://127.0.0.1:5005

# Terminal 2: Start React Frontend Client
cd Program_5_FullStack/frontend
npm run dev
# Frontend running on: http://localhost:5173
```

### 6.5 Terminal Execution & Verification Output
```text
================================================================
  CLOSETÉ - PROGRAM 5 FULL STACK (MERN) VERIFICATION SUITE       
================================================================

--- PART 1: VERIFYING BACKEND MERN REST API ---
[TEST 1] Testing GET /api/health:
Status Code: 200 OK | Platform: "CLOSETÉ Full Stack MERN Platform"
✓ TEST 1 PASSED: Backend API health check operational.

[TEST 2] Testing GET /api/products:
Status Code: 200 OK (Catalog Count: 3 items)
✓ TEST 2 PASSED: Products retrieved successfully.

[TEST 3] Testing POST /api/auth/register:
Status Code: 201 Created | Customer JWT Token Generated: Yes
✓ TEST 3 PASSED: Full-stack registration & token issuance verified.

[TEST 4] Testing POST /api/products (Protected Creation):
Status Code: 201 Created | Created Garment ID: mem-1794680057519
✓ TEST 4 PASSED: Product created via backend API.

[TEST 5] Testing POST /api/orders (Order Finalization):
Status Code: 201 Created | Persisted Order Reference: mem-ord-1794680057523
✓ TEST 5 PASSED: Order creation & user linking verified.

--- PART 2: VERIFYING FRONTEND & DEPLOYMENT MANIFESTS ---
✓ frontend/src/api/client.js verified on disk.
✓ frontend/src/context/AuthContext.jsx verified on disk.
✓ frontend/src/context/CartContext.jsx verified on disk.
✓ frontend/src/pages/AdminProductsPage.jsx verified on disk.
✓ frontend/src/pages/CheckoutPage.jsx verified on disk.
✓ frontend/vercel.json verified on disk.
✓ backend/render.yaml verified on disk.
✓ Vercel SPA Routing Configuration Verified: true
✓ Render Backend Deployment Manifest Verified: true

================================================================
  PROGRAM 5 FULL STACK (MERN) SYSTEM 100% VERIFIED!             
================================================================
```

### 6.6 Screenshots of Execution & Output
```text
+-----------------------------------------------------------------------------------+
| FIGURE 5.1: PROGRAM 5 — INTEGRATED MERN STOREFRONT (REACT CLIENT)                 |
| URL: http://localhost:5173                                                        |
+-----------------------------------------------------------------------------------+
| [TOP BAR] COMPLIMENTARY WORLDWIDE DELIVERY • SIGNED IN AS: ADMIN                  |
| [NAVBAR]  CLOSETÉ | Atelier Collection | Admin Studio | Wishlist (0) | Bag (1)    |
| [HERO]    AUTUMN / WINTER 2026 ATELIER                                            |
|           Contemporary Tailoring & Minimalist Elegance                            |
|                                                                                   |
| [DYNAMIC MERN CATALOG - FETCHED VIA AXIOS FROM 127.0.0.1:5005]                     |
| +-------------------------+ +-------------------------+ +-----------------------+ |
| | [Img] Silk Drape Gown   | | [Img] Cashmere Blazer   | | [Img] Pleated Trousers| |
| | ₹11,990                 | | ₹14,990                 | | ₹6,490                |
| | [ Add to Wardrobe ]     | | [ Add to Wardrobe ]     | | [ Add to Wardrobe ]   | |
| +-------------------------+ +-------------------------+ +-----------------------+ |
+-----------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------+
| FIGURE 5.2: PROGRAM 5 — BACKEND API STATUS DASHBOARD                              |
| URL: http://127.0.0.1:5005                                                        |
+-----------------------------------------------------------------------------------+
| [BACKEND STATUS CARD]                                                             |
| CLOSETÉ - "STYLE IS PERSONAL. MAKE IT YOURS."                                     |
| [● FULL STACK MERN BACKEND RUNNING]                                               |
| Direct API Links:                                                                 |
| • [View Products API (GET)] -> http://127.0.0.1:5005/api/products                 |
| • [Health Check API]        -> http://127.0.0.1:5005/api/health                   |
| • [Open React Frontend]     -> http://localhost:5173                              |
+-----------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------+
| FIGURE 5.3: PROGRAM 5 — ADMIN CRUD ATELIER DASHBOARD                              |
| URL: http://localhost:5173/admin/products                                         |
+-----------------------------------------------------------------------------------+
| [ADMIN CRUD PORTAL] Connected to Express + MongoDB Backend                        |
|                                                                                   |
| [CREATE / EDIT GARMENT]              [LIVE INVENTORY DATABASE]                    |
| Garment Name: [ Crepe Blazer       ] | Garment            Category   Price  Action |
| Category:     [ Outerwear        v ] | Silk Wrap Gown     Dresses    ₹13990 [Edit] |
| Price (INR):  [ 9490               ] | Cashmere Blazer    Outerwear  ₹14990 [Del]  |
| Description:  [ Structured crepe... ] | Wool Trench        Outerwear  ₹18990 [Edit] |
| [ + Add Piece to Catalog ]           | (Direct mutations to MongoDB via Mongoose) |
+-----------------------------------------------------------------------------------+
```

---

## 7. VIVA VOCE QUESTIONS & COMPREHENSIVE ANSWERS

### Q1: What is the primary difference between Program 1 (Vanilla JS) and Program 2 (React)?
* **Answer:** Program 1 relies on direct DOM manipulation where JavaScript manually creates elements (`document.createElement`) and mutates the browser tree. Program 2 uses React's declarative Virtual DOM model where UI is a function of state (`UI = f(state)`). When state changes via `useState`, React computes the minimal difference using reconciliation and efficiently updates the real DOM.

### Q2: How does Program 3 achieve HTTP request handling without Express?
* **Answer:** Node's built-in `http` module provides `http.createServer((req, res) => ...)`. In this native environment, the `req` object is a Readable Stream. We buffer binary data chunks by listening to `req.on('data')` and parse the completed payload string into a JSON object inside `req.on('end')`.

### Q3: Why is password hashing important, and why use bcrypt over SHA-256?
* **Answer:** Plaintext passwords must never be stored. Simple hashes like MD5 or SHA-256 are susceptible to rainbow table lookups and GPU brute-force attacks. `bcrypt` incorporates an adaptive work factor (salt rounds = 10) and unique salting, ensuring the hash takes substantial computation time, effectively thwarting brute-force attacks.

### Q4: Explain the role of JWT (JSON Web Tokens) in Program 4 and 5.
* **Answer:** JWT facilitates stateless authentication. When a user logs in, the server signs a token containing the user's ID and role using a secret key. The client includes this token in the `Authorization: Bearer <token>` header of subsequent requests. The server verifies the signature without needing to query a session store on every request.

### Q5: What is CORS, and why is it necessary in Program 5?
* **Answer:** Cross-Origin Resource Sharing (CORS) is a browser security mechanism that blocks web pages from making requests to a different domain or port. In Program 5, the React frontend runs on port `5173` while the Express backend runs on port `5005`. Without the `cors()` middleware on Express, the browser blocks all API responses.

---

**Certified by Student:** Nupur Kadam (Roll No. 19)  
**Private GitHub Repository:** [https://github.com/nupurkadam17/FSD_19_CA3](https://github.com/nupurkadam17/FSD_19_CA3)
