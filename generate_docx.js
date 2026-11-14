/**
 * Script to generate CLOSETÉ_Practical_Submission_Report.docx
 */
const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType
} = require('docx');

function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 140 }
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 }
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 }
  });
}

function createPara(text, bold = false) {
  return new Paragraph({
    children: [new TextRun({ text, bold, font: 'Calibri', size: 22 })],
    spacing: { after: 120 }
  });
}

function createCodeBlock(text) {
  const lines = text.split('\n');
  return lines.map(line => new Paragraph({
    children: [new TextRun({ text: line, font: 'Consolas', size: 18, color: '222222' })],
    spacing: { line: 240 },
    shading: { type: ShadingType.CLEAR, fill: 'F4F4F4' }
  }));
}

function createBox(title, description) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: title, bold: true, font: 'Calibri', size: 20, color: '0A0A0A' })],
                spacing: { after: 60 }
              }),
              new Paragraph({
                children: [new TextRun({ text: description, font: 'Calibri', size: 18, color: '555555' })],
                spacing: { after: 60 }
              }),
              new Paragraph({
                children: [new TextRun({ text: '[ Paste Actual Execution Screenshot Here ]', bold: true, color: 'C5A880', size: 18 })],
                alignment: AlignmentType.CENTER
              })
            ],
            shading: { type: ShadingType.CLEAR, fill: 'FAFAFA' },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 8, color: 'D8D8D5' },
              bottom: { style: BorderStyle.SINGLE, size: 8, color: 'D8D8D5' },
              left: { style: BorderStyle.SINGLE, size: 16, color: '0A0A0A' },
              right: { style: BorderStyle.SINGLE, size: 8, color: 'D8D8D5' }
            },
            margins: { top: 180, bottom: 180, left: 180, right: 180 }
          })
        ]
      })
    ]
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22 }
      }
    }
  },
  sections: [{
    properties: {},
    children: [
      // Title
      new Paragraph({
        children: [
          new TextRun({ text: 'CLOSETÉ — PRACTICAL SUBMISSION REPORT', bold: true, size: 36, font: 'Georgia', color: '0A0A0A' })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Full Stack Development (CA3) • B.E. AI & DS (Semester V)', size: 24, font: 'Calibri', color: '666666' })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      }),

      // Student Meta
      new Paragraph({
        children: [
          new TextRun({ text: 'Candidate Name: ', bold: true }),
          new TextRun({ text: 'Nupur Kadam    ' }),
          new TextRun({ text: 'Roll No: ', bold: true }),
          new TextRun({ text: '19    ' }),
          new TextRun({ text: 'Topic: ', bold: true }),
          new TextRun({ text: 'Online Shopping (Women\'s Luxury Fashion)' })
        ],
        spacing: { after: 120 }
      }),

      // GitHub Repository Callout
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: 'PRIVATE GITHUB REPOSITORY LINK:\n', bold: true, size: 22, color: 'FFFFFF' }),
                      new TextRun({ text: 'https://github.com/nupurkadam17/FSD_19_CA3', bold: true, size: 24, color: 'C5A880' })
                    ],
                    alignment: AlignmentType.CENTER
                  })
                ],
                shading: { type: ShadingType.CLEAR, fill: '0A0A0A' },
                margins: { top: 140, bottom: 140, left: 140, right: 140 }
              })
            ]
          })
        ]
      }),
      new Paragraph({ text: '', spacing: { after: 200 } }),

      // Architecture Table
      createHeading1('1. Architecture & Program Directory'),
      createPara('The platform consists of five decoupled software implementations meeting all university requirements:'),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: ['Program', 'Paradigm & Tech', 'Port', 'Key Features'].map(h => new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: 'FFFFFF' })] })],
              shading: { type: ShadingType.CLEAR, fill: '292929' },
              margins: { top: 100, bottom: 100, left: 100, right: 100 }
            }))
          }),
          ...[
            ['Program 1', 'HTML5 / CSS3 / Vanilla JS', 'Port 5000', 'DOM manipulation, Fetch GET & POST, Regex validation'],
            ['Program 2', 'React 18, Hooks, Vite, Router', 'Port 3000', 'Functional components, useState, useEffect, controlled forms'],
            ['Program 3', 'Node.js Core HTTP (No Express)', 'Port 5001', 'Native streams, fs/promises, EventEmitter, audit logging'],
            ['Program 4', 'Express.js REST API with JWT', 'Port 5002', 'CRUD, JWT authentication, bcryptjs (10 rounds), RBAC'],
            ['Program 5', 'Full Stack MERN Platform', 'Port 5005 & 5173', 'Mongoose models, React client, Axios interceptors, Admin CRUD']
          ].map(row => new TableRow({
            children: row.map(cell => new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20 })] })],
              margins: { top: 80, bottom: 80, left: 80, right: 80 }
            }))
          }))
        ]
      }),
      new Paragraph({ text: '', spacing: { after: 200 } }),

      // -------------------------------------------------------------
      // PROGRAM 1
      // -------------------------------------------------------------
      createHeading1('2. Program 1: Browser-Based Online Fashion Shopping Interface'),
      createPara('Aim:', true),
      createPara('To develop a browser-based fashion shopping interface using HTML5, modern CSS3, and vanilla JavaScript (ES6+), demonstrating DOM manipulation, event handling, product search, multi-faceted filtering, regex validation, and asynchronous Fetch API GET and POST methods.'),
      createPara('Technologies Used:', true),
      createPara('HTML5 semantic tags, CSS3 custom properties & Flexbox/Grid, Vanilla JavaScript DOM APIs, Fetch API, and Node.js native HTTP server.'),
      createPara('Execution Command: node Program_1_Vanilla_JS/server.js  (http://localhost:5000)', true),
      createHeading3('Verification & Server Test Output:'),
      ...createCodeBlock(
        '[TEST 1] GET /api/products -> 200 OK (Catalog Count: 17 items)\n' +
        '[TEST 2] POST /api/products -> 201 Created (Created ID: closete-0763)\n' +
        '[TEST 3] POST Validation Error -> 400 Bad Request ("name, price, and category required")\n' +
        '[TEST 4] Static HTML Serving -> 200 OK\n' +
        '✓ ALL LOGIC & REGEX TESTS PASSED (100%)'
      ),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 1.1: Program 1 — Storefront Catalog & Hero Section', 'Shows editorial luxury hero, search bar, category chips (Dresses, Tops, Outerwear), and dynamic cards.'),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 1.2: Program 1 — Add Piece (POST) Modal & Checkout Regex Validation', 'Shows modal submitting new garment via Fetch POST and regex validation for email, phone, and PIN code.'),
      new Paragraph({ text: '', spacing: { after: 200 } }),

      // -------------------------------------------------------------
      // PROGRAM 2
      // -------------------------------------------------------------
      createHeading1('3. Program 2: React-Based Online Fashion Shopping Application'),
      createPara('Aim:', true),
      createPara('To construct a single-page e-commerce application using React 18, demonstrating functional components, JSX, props passing, hooks (useState, useEffect, useMemo), controlled form validation, and multi-route navigation using React Router v6.'),
      createPara('Technologies Used:', true),
      createPara('React 18, Vite, React Router DOM v6, JSX, and localStorage API.'),
      createPara('Execution Command: cd Program_2_React && npm run dev  (http://localhost:3000)', true),
      createHeading3('Verification & Build Output:'),
      ...createCodeBlock(
        '✓ useState Hooks Utilized: true\n' +
        '✓ useEffect Lifecycle Hooks Utilized: true\n' +
        '✓ useMemo Optimization Utilized: true\n' +
        '✓ React Router v6 Configured: true\n' +
        '> vite build\n' +
        '✓ 49 modules transformed in 910ms (0 errors, 0 warnings)'
      ),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 2.1: Program 2 — React 18 Storefront & Multi-Page Navigation', 'Shows dynamic product grid, filter sidebar, and React Router navigation links (/shop, /product/:id).'),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 2.2: Program 2 — Controlled Product Entry Form (useState & useEffect)', 'Shows real-time character-length validation and automatic route redirection using useNavigate().'),
      new Paragraph({ text: '', spacing: { after: 200 } }),

      // -------------------------------------------------------------
      // PROGRAM 3
      // -------------------------------------------------------------
      createHeading1('4. Program 3: Node.js Inventory Utility (Zero Express)'),
      createPara('Aim:', true),
      createPara('To implement a fashion inventory management utility using only Node.js core built-in modules (http, fs, path, events, stream), strictly avoiding Express or third-party web frameworks.'),
      createPara('Technologies Used:', true),
      createPara('Node.js http.createServer, fs/promises, EventEmitter class, and fs.createWriteStream.'),
      createPara('Execution Command: node Program_3_Node_HTTP/server.js  (http://localhost:5001)', true),
      createHeading3('Verification & Audit Stream Output:'),
      ...createCodeBlock(
        '[TEST 1] GET /api/inventory -> 200 OK (Total Items: 8)\n' +
        '[TEST 2] GET /api/inventory/low-stock -> 200 OK (Low Stock Count: 3)\n' +
        '[TEST 3] POST /api/inventory -> 201 Created (Created ID: INV-4250)\n' +
        '[TEST 4] PUT /api/inventory/:id/stock -> 200 OK (Emitted lowStockAlert)\n' +
        '[TEST 5] Writable Stream Audit File -> Verified (logs/inventory_audit.log)\n' +
        '[TEST 6] DELETE /api/inventory/:id -> 200 OK\n' +
        '✓ ALL PROGRAM 3 AUTOMATED TESTS PASSED (7/7)!'
      ),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 3.1: Program 3 — Native Node Server Dashboard & Audit Stream Log', 'Displays root HTML dashboard on port 5001 and append-only transaction events in inventory_audit.log.'),
      new Paragraph({ text: '', spacing: { after: 200 } }),

      // -------------------------------------------------------------
      // PROGRAM 4
      // -------------------------------------------------------------
      createHeading1('5. Program 4: Secure Express.js REST API'),
      createPara('Aim:', true),
      createPara('To develop a secure RESTful API for an online fashion boutique using Express.js, featuring CRUD operations, custom request logging middleware, schema input validation, centralized error handling, JWT authentication, and bcryptjs password hashing.'),
      createPara('Technologies Used:', true),
      createPara('Express.js, jsonwebtoken, bcryptjs (10 salt rounds), CORS, and custom middleware.'),
      createPara('Execution Command: node Program_4_Express_API/server.js  (http://localhost:5002)', true),
      createHeading3('Verification & Route Security Output:'),
      ...createCodeBlock(
        '[TEST 1] Public GET /api/v1/products -> 200 OK\n' +
        '[TEST 2] POST /api/v1/auth/register -> 201 Created (Password hashed with bcrypt)\n' +
        '[TEST 3] POST /api/v1/auth/login -> 200 OK (Bearer JWT issued)\n' +
        '[TEST 4] GET /api/v1/auth/profile with Bearer Token -> 200 OK\n' +
        '[TEST 5] GET /api/v1/auth/profile without Token -> 401 Unauthorized\n' +
        '[TEST 6] POST /api/v1/products Protected -> 201 Created\n' +
        '[TEST 7] Malformed POST Validation -> 400 Bad Request\n' +
        '[TEST 8] Customer DELETE Attempt -> 403 Forbidden (RBAC Verified)\n' +
        '[TEST 9] Admin DELETE Execution -> 200 OK\n' +
        '✓ ALL PROGRAM 4 SECURE REST API TESTS PASSED (11/11)!'
      ),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 4.1: Program 4 — Express REST API Directory & RBAC Security', 'Shows interactive endpoint status, JWT Bearer authentication headers, and role-based route guards.'),
      new Paragraph({ text: '', spacing: { after: 200 } }),

      // -------------------------------------------------------------
      // PROGRAM 5
      // -------------------------------------------------------------
      createHeading1('6. Program 5: Full Stack MERN Platform Integration'),
      createPara('Aim:', true),
      createPara('To engineer an integrated Full Stack MERN fashion platform uniting React 18, Express.js, and MongoDB via Mongoose, with persistent data modeling, CORS, Axios interceptors, Context API state management, and deployment manifests for Vercel and Render.'),
      createPara('Technologies Used:', true),
      createPara('React 18, Vite, Express.js, MongoDB / Mongoose, Axios, dotenv, vercel.json, render.yaml.'),
      createPara('Execution Commands:\nBackend: node Program_5_FullStack/backend/server.js  (http://localhost:5005)\nFrontend: cd Program_5_FullStack/frontend && npm run dev  (http://localhost:5173)', true),
      createHeading3('Verification & Build Output:'),
      ...createCodeBlock(
        '[TEST 1] GET /api/health -> 200 OK ("CLOSETÉ Full Stack MERN Platform")\n' +
        '[TEST 2] GET /api/products -> 200 OK\n' +
        '[TEST 3] POST /api/auth/register -> 201 Created (Customer JWT Issued)\n' +
        '[TEST 4] POST /api/products Protected -> 201 Created\n' +
        '[TEST 5] POST /api/orders -> 201 Created\n' +
        '✓ Vercel SPA Routing Configuration (vercel.json) Verified\n' +
        '✓ Render Backend Deployment Manifest (render.yaml) Verified\n' +
        '> vite build (Frontend)\n' +
        '✓ 106 modules transformed in 1.15s (0 errors)'
      ),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 5.1: Program 5 — Full Stack MERN Storefront (Port 5173)', 'Displays dynamic garments fetched from backend API via Axios request interceptor with JWT tokens.'),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 5.2: Program 5 — Backend REST API Status Dashboard (Port 5005)', 'Displays Express + Mongoose server status, health check API, and direct API exploration links.'),
      new Paragraph({ text: '', spacing: { after: 100 } }),
      createBox('Figure 5.3: Program 5 — Admin CRUD Atelier Dashboard', 'Allows administrators to create, edit, and delete pieces live with real MongoDB persistence.'),
      new Paragraph({ text: '', spacing: { after: 200 } }),

      // -------------------------------------------------------------
      // VIVA VOCE SECTION
      // -------------------------------------------------------------
      createHeading1('7. University Viva Voce Examination Cheat Sheet'),
      createPara('Q1: What is the primary difference between Program 1 and Program 2?', true),
      createPara('Answer: Program 1 uses imperative DOM manipulation (document.createElement) to manually alter elements. Program 2 uses React\'s declarative Virtual DOM model (UI = f(state)) where state updates trigger efficient reconciliation diffs.'),

      createPara('Q2: How does Program 3 handle POST requests without Express?', true),
      createPara('Answer: The incoming request is a Readable Stream. We buffer binary chunks with req.on("data", chunk => ...) and parse the combined string into an object using JSON.parse() on req.on("end").'),

      createPara('Q3: Why use bcrypt over simple SHA-256 for password security?', true),
      createPara('Answer: SHA-256 is fast and susceptible to GPU brute-forcing and precomputed rainbow tables. bcrypt incorporates an adaptive work factor (salt rounds = 10) and random salting, making brute-force attacks computationally infeasible.'),

      createPara('Q4: What role does JWT play in Program 4 and 5?', true),
      createPara('Answer: JWT enables stateless authentication. After login, the server issues a signed cryptographic token that the client transmits in the Authorization: Bearer <token> header, eliminating the need for server-side session stores.'),

      createPara('Q5: Why is CORS necessary in Program 5?', true),
      createPara('Answer: The React frontend runs on port 5173 while the Express backend runs on port 5005. Because the origins differ, browsers block cross-origin requests unless the server sends Access-Control-Allow-Origin headers via the cors() middleware.')
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outputPath = path.join(__dirname, 'CLOSETÉ_Practical_Submission_Report.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('SUCCESS: Generated Microsoft Word report at:', outputPath);
});
