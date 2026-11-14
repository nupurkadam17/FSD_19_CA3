# CLOSETÉ — Luxury Women's Fashion E-Commerce Platform
> *"STYLE IS PERSONAL. MAKE IT YOURS."*

A portfolio-grade women's fashion platform and complete university practical submission for **Full Stack Development (CA3)**, B.E. Artificial Intelligence & Data Science, Semester V.

CLOSETÉ comprises five independent, demonstrable software architectures satisfying all academic requirements while delivering a cohesive luxury aesthetic inspired by contemporary fashion lookbooks (*The Row, Jacquemus, Celine, and COS*).

---

## 1. Brand Identity & Design System

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 CLOSETÉ                                     │
│  Palette:                                                                   │
│  • Pure Black: #0A0A0A   • Charcoal:  #292929   • Accent Gold: #C5A880      │
│  • Off White:  #F7F6F2   • Soft Grey: #D8D8D5   • Pure White:  #FFFFFF      │
│                                                                             │
│  Typography:                                                                │
│  • Headings / Editorial: Cormorant Garamond & Playfair Display              │
│  • Navigation / Body:    Plus Jakarta Sans & Inter                          │
│                                                                             │
│  Product Spectrum (INR): ₹2,490 – ₹14,990                                   │
│  Categories: Dresses, Tops, Shirts, Trousers, Co-ord Sets,                  │
│              Outerwear, Accessories                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Five Independent Academic Programs

| Program | Title & Paradigm | Core Technologies | Port | Verification Script |
| :--- | :--- | :--- | :--- | :--- |
| **Program 1** | Browser-Based Online Fashion Shopping Interface | HTML5, CSS3, Vanilla JS (ES6+), Fetch API, Native HTTP | `5000` | `node Program_1_Vanilla_JS/test_handler.js` |
| **Program 2** | React-Based Online Fashion Shopping Application | React 18, JSX, Hooks (`useState`, `useEffect`), React Router | `3000` | `node Program_2_React/verify_components.js` |
| **Program 3** | Node.js Fashion Inventory Utility (No Express) | Node.js `http`, `fs/promises`, `path`, `events`, `stream` | `5001` | `node Program_3_Node_HTTP/test_program3.js` |
| **Program 4** | Secure Express.js REST API with JWT & bcrypt | Express.js, JWT, bcryptjs, Middleware, RBAC | `5002` | `node Program_4_Express_API/test_program4.js` |
| **Program 5** | Integrated Full Stack Fashion Platform (MERN) | React 18 + Express.js + MongoDB (Mongoose) + Axios | `5005` (API)<br>`5173` (Client) | `node Program_5_FullStack/test_program5.js` |

---

## 3. Repository Architecture

```text
CLOSETÉ/
├── Program_1_Vanilla_JS/              # Program 1: Pure HTML5/CSS3/Vanilla JS
│   ├── index.html                    # Luxury storefront with on-screen API console
│   ├── css/                          # variables.css, reset.css, style.css
│   ├── js/                           # api.js, validation.js, filter.js, dom.js, app.js
│   ├── data/products.json            # 12 curated fashion garments in INR
│   ├── server.js                     # Native HTTP server (GET/POST endpoints)
│   ├── test_logic.js                 # Automated unit tests for validation & filters
│   └── test_handler.js               # Protocol test suite (200, 201, 400, 404)
│
├── Program_2_React/                   # Program 2: Independent React 18 Application
│   ├── src/
│   │   ├── components/               # Navbar, Footer, ProductCard, ProductGrid, Form
│   │   ├── pages/                    # Home, Shop, ProductDetail, AddProduct, Checkout
│   │   ├── data/sampleProducts.js    # React state dataset
│   │   ├── App.jsx                   # Router & root state
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── verify_components.js          # Component & Hook verification test
│
├── Program_3_Node_HTTP/               # Program 3: Native Node.js (No Express)
│   ├── data/inventory.json           # File-backed persistence store
│   ├── logs/inventory_audit.log      # Node Writable Stream transaction log
│   ├── utils/fileStore.js            # fs/promises async operations
│   ├── utils/inventoryEvents.js      # EventEmitter pub/sub
│   ├── server.js                     # Native http.createServer() router
│   └── test_program3.js              # 7-step automated test suite
│
├── Program_4_Express_API/             # Program 4: Secure Express REST API
│   ├── config/db.js                  # Data store with seeded admin/customer
│   ├── controllers/                  # authController.js, productController.js
│   ├── middleware/                   # logger.js, validator.js, auth.js, errorHandler.js
│   ├── routes/                       # authRoutes.js, productRoutes.js
│   ├── server.js                     # Express app with middleware pipeline
│   ├── .env.example
│   └── test_program4.js              # 11-step automated Supertest suite
│
├── Program_5_FullStack/               # Program 5: Full Stack MERN Platform
│   ├── backend/                      # Express + Mongoose API
│   │   ├── models/                   # Product.js, User.js, Order.js
│   │   ├── routes/ & controllers/    # Products, Auth, Orders
│   │   ├── seeds/seed.js             # MongoDB seeding script
│   │   ├── render.yaml               # Render.com deployment manifest
│   │   └── server.js
│   ├── frontend/                     # React + Vite client with Axios
│   │   ├── src/api/client.js         # JWT interceptor configuration
│   │   ├── src/context/              # AuthContext, CartContext
│   │   ├── src/pages/                # Includes AdminProductsPage CRUD dashboard
│   │   └── vercel.json               # Vercel SPA rewrite manifest
│   └── test_program5.js              # Automated full-stack test suite
│
├── Documentation/
│   ├── Program_1_explanation.md      # Practical report for Program 1
│   ├── Program_2_explanation.md      # Practical report for Program 2
│   ├── Program_3_explanation.md      # Practical report for Program 3
│   ├── Program_4_explanation.md      # Practical report for Program 4
│   ├── Program_5_explanation.md      # Practical report for Program 5
│   └── API_DOCUMENTATION.md          # Comprehensive REST API reference
│
└── Screenshots/                      # Screenshot folders for evaluation evidence
    ├── Program_1/.gitkeep
    ├── Program_2/.gitkeep
    ├── Program_3/.gitkeep
    ├── Program_4/.gitkeep
    └── Program_5/.gitkeep
```

---

## 4. Execution & Installation Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

---

### Running Program 1 (Vanilla JS & HTML5/CSS3)
```bash
# 1. Start the native HTTP web server:
cd Program_1_Vanilla_JS
node server.js
# Access in browser: http://localhost:5000

# 2. Run automated validation and protocol verification:
node test_logic.js
node test_handler.js
```

---

### Running Program 2 (React Application)
```bash
cd Program_2_React
npm install
npm run dev
# Access in browser: http://localhost:3000

# Run component architecture verification:
node verify_components.js
```

---

### Running Program 3 (Node.js without Express)
```bash
cd Program_3_Node_HTTP
node server.js
# Access endpoints: http://127.0.0.1:5001/api/inventory

# Run automated 7-step test suite (Streams, Events, File I/O):
node test_program3.js
```

---

### Running Program 4 (Secure Express REST API)
```bash
cd Program_4_Express_API
npm install
npm start
# Access endpoints: http://127.0.0.1:5002/api/v1/products

# Run 11-step automated Supertest suite (JWT, bcrypt, RBAC, Validation):
node test_program4.js
```

---

### Running Program 5 (Full Stack MERN Platform)

#### Start the Backend API:
```bash
cd Program_5_FullStack/backend
npm install
npm start
# Backend active on: http://127.0.0.1:5005
```

#### Start the React Frontend:
```bash
cd Program_5_FullStack/frontend
npm install
npm run dev
# Frontend active on: http://localhost:5173
```

#### Run Full-Stack Automated Verification:
```bash
node Program_5_FullStack/test_program5.js
```

---

## 5. Pre-Seeded Evaluation Credentials

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@closete.com` | `Admin@123` | Full CRUD, publish new garments, delete items, access Admin Atelier |
| **Client** | `client@closete.com` | `Client@123` | Browse catalog, save to wishlist, manage bag, place persistent orders |

---

## 6. Academic Compliance Checklist

- [x] **Program 1 (HTML/CSS/JS):** Semantic HTML5, CSS3 variables, DOM manipulation, Fetch API, GET & POST handling, regex validation.
- [x] **Program 2 (React):** Functional components, JSX, props, `useState`, `useEffect`, `useMemo`, controlled form validation, React Router v6.
- [x] **Program 3 (Node HTTP):** Zero Express dependencies, `http.createServer`, `fs/promises`, `EventEmitter` stock alerts, `fs.createWriteStream` audit logs.
- [x] **Program 4 (Express API):** RESTful CRUD, custom logger, schema validator, centralized error handler, `bcryptjs` (10 rounds), `jsonwebtoken` auth, RBAC.
- [x] **Program 5 (Full Stack):** React + Express + Mongoose + MongoDB, Axios interceptors, Context API, Admin CRUD portal, Vercel/Render deployment configs.
- [x] **Submission Report:** Comprehensive practical submission report with execution outputs, GitHub link, and viva guide in `CLOSETÉ_Practical_Submission_Report.md` and `CLOSETÉ_Practical_Submission_Report.docx`.
